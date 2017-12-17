App = {
    web3Provider: null,
    contracts: {},

    init: function() {
        console.log("initing");
        return App.initWeb3();
    },

    initWeb3: function() {
        console.log("web3 initing");
        // Is there is an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fallback to the TestRPC
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function() {
        $.getJSON('Resume.json', function(data) {

            console.log("Found Resume.json");

            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var ResumeArtifact = data;
            App.contracts.Resume = TruffleContract(ResumeArtifact);

            // Set the provider for our contract
            App.contracts.Resume.setProvider(App.web3Provider);

            App.freshInfo();
        });
        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-changeRes', App.updateResume);
    },

    freshInfo: function() {
        var deployedResume;

        App.contracts.Resume.deployed().then( function(instance) {
            // Get deployed contract's address

            deployedResume = instance;
            $("#resumeAddress").text(deployedResume.address);
            return deployedResume.owner.call();
        }).then( function(owner) {
            // Who owns the resume contract? if owner, allow changes

            $("#owner").val(owner);
            web3.eth.getAccounts( function(e, acts) {
                // Set the default account for transactions
                web3.eth.defaultAccount = acts[0];
                if(owner == acts[0])
                    //document.getElementById('myButton').style.visibility="visible";
                    style.visibility="visible";
            });

            return deployedResume.resumeAscii.call();
        }).then( function(ascii) {
            // Populate resume

            $("#resumeAscii").val(ascii)
        }).catch(function(err) {
            alert("Error accessing contract: " + err.message);
        });
    },

    updateResume: function(event) {

        var deployedResume;

        App.contracts.Resume.deployed().then( function(instance) {
            deployedResume = instance;
            console.log("setting resume to " + $("#resumeAscii").val());
            return deployedResume.DeployAscii($("#resumeAscii").val());
        }).then( function() {
            console.log("verifying resume ascii...");
            return deployedResume.resumeAscii.call();
        }).then( function(updatedResumeAscii) {
            console.log("got " + updatedResumeAscii);
            $("#resumeAscii").val(updatedResumeAscii);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

};


$(function() {
    $(window).load(function() {
        App.init();
    });
});

