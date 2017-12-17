pragma solidity ^0.4.17; 
contract Resume {
    address public owner;
    string public resumeAscii;

    modifier restricted() {
        if (msg.sender != owner) revert();
        _;
    }

    function Resume() public {
        owner = msg.sender;
    }

    function DeployAscii(string updates) public restricted
    {
        resumeAscii = updates;
    }
}
