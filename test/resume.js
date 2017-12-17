var Resume = artifacts.require("./Resume.sol");

contract('Resume', function(accounts) {

    console.log(accounts);
    var owner_account = accounts[0];
    var viewer_account = accounts[1];

    it("should initially be empty", function() {

        var myContract;
        Resume.new({from: owner_account}).then( function(instance) {
            myContract = instance;
            return myContract.owner.call();
        }).then( function(addr) {
            assert.equal(addr, owner_account, "Owner account doesn't match");
            return myContract.resumeAscii();
        }).then( function(str) {
            assert.equal(str, "", "Resume Ascii was not empty");
        });
    });

    it("should return a deployed resume", function() {

        var myContract;
        var fetchedResume;
        var lol;
        var resume = "my blockchain resume will get me a job";
        Resume.new({from: owner_account}).then( function(instance) {
            myContract = instance;
            myContract.DeployAscii(resume);
        }).then( function() {
            return myContract.resumeAscii.call();
        }).then( function(resumeBytes) {
            assert.equal(resumeBytes, resume, "Deployed resume does not match fetched via getter");
            return myContract.resumeAscii();
        }).then( function(resumeBytes) {
            assert.equal(resumeBytes, resume, "Deployed resume does not match fetched via automatic getter");
        });
    });

    it("should allow a longer deployed resume to overwrite orig", function() {

        var myContract;
        var resumeShort = "my job";
        var resumeLong = "my blockchain resume will get me a job";
        Resume.new({from: owner_account}).then( function(instance) {
            myContract = instance;
            myContract.DeployAscii(resumeShort);
        }).then( function() {
            myContract.DeployAscii(resumeLong);
        }).then( function() {
            return myContract.resumeAscii.call();
        }).then( function(fetchedResume) {
            assert.equal(fetchedResume, resumeLong, "Deployed resume does not match fetched");
        });
    });

    it("should allow a shorter deployed resume to overwrite orig", function() {

        var myContract;
        var resumeShort = "my job";
        var resumeLong = "my blockchain resume will get me a job";
        Resume.new({from: owner_account}).then( function(instance) {
            myContract = instance;
            myContract.DeployAscii(resumeLong);
        }).then( function() {
            myContract.DeployAscii(resumeShort);
        }).then( function() {
            return myContract.resumeAscii.call();
        }).then( function(fetchedResume) {
            assert.equal(fetchedResume, resumeShort, "Deployed resume does not match fetched");
        });
    });


    it("should minimize gas costs", function() {

        var myContract;
        var resumeShort = "my job";
        var resumeLong = "my blockchain resume will get me a job";
        Resume.new({from: owner_account}).then( function(instance) {
            myContract = instance;
            var estimate = web3.eth.estimateGas(myContract.DeployAscii(resumeLong));
            console.log("estimatated gas long is " + estimate);

            estimate = web3.eth.estimateGas(myContract.DeployAscii(resumeShort));
            console.log("estimatated gas short is " + estimate);

        }).then( function() {
            myContract.DeployAscii(resumeShort);
        }).then( function() {
            return myContract.resumeAscii.call();
        }).then( function(fetchedResume) {
            assert.equal(fetchedResume, resumeShort, "Deployed resume does not match fetched");
        });
    });

});
