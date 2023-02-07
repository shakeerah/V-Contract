// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract VPortal {
    uint256 public totalWaves;
    address[] visitorsAdds;
    address sendersAddress;

    struct person {
        string name;
        string email;
        string[] messages;
        address visitorsAddress;
        uint waveNo;
        uint256 wavedAt; // The timestamp when the user waved.
    }
    // person[] public visitors;
    mapping(address => person) public visitors;

    event NewWave(address indexed from, uint256 wavedAt, string message);
    uint256 waveGiftAmount = 0.000001 ether;
    uint256 private randomNumberSeed;

    constructor() payable {
        console.log("Payable contract constructed");
        // sendersAddress = msg.sender;

        randomNumberSeed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(
        string memory _name,
        string memory _email,
        string memory _message
    ) public {
        sendersAddress = msg.sender;
        totalWaves += 1;
        console.log("%s has just sent a wave", sendersAddress);

        if (!previoulyVisited(sendersAddress, _message)) {
            string[] memory _messages = new string[](1);
            // _messages.push(_message);
            _messages[0] = (_message);

            // visitors;
            visitors[sendersAddress] = person(
                _name,
                _email,
                _messages,
                sendersAddress,
                1,
                block.timestamp
            );
            visitorsAdds.push(sendersAddress);
        }
        emit NewWave(msg.sender, block.timestamp, _message);

        // Generate a new seed for the next user that sends a wave
        randomNumberSeed = (block.timestamp + block.difficulty) % 100;
         console.log("Random # generated: %d", randomNumberSeed);

        if(randomNumberSeed < 20 ){
            console.log("%s won!", msg.sender);

            // balance of the contract itself.
            require (waveGiftAmount <= address(this).balance, "Trying to withdraw more money than the contract has" );

            // end money
            (bool _success, ) = (msg.sender).call{ value: waveGiftAmount}('');
            require (_success, "Failed to withdraw money from contract.");
        }

    }

    function previoulyVisited(address _sender, string memory _message)
        public
        returns (bool)
    {
         /*
         * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
         */
       

        /*
         * Update the visitor wave, smessage & timestamp 
         */
        if (visitors[_sender].visitorsAddress == _sender) {
            require( visitors[_sender].wavedAt + 1200 minutes < block.timestamp, "Please wave again tomorrow for a chance to win some cool stuff");
            visitors[_sender].messages.push(_message);
            visitors[_sender].waveNo += 1;
            visitors[_sender].wavedAt = block.timestamp;
            return true;
        }
        return false;
    }

     

    function getTotalWaves() public view returns (uint[] memory) {
        uint[] memory _totals= new uint[](2);
        _totals[0] =totalWaves;
        _totals[1] = visitorsAdds.length;
        return _totals;
    }

    function getVisitorsWaves() public view returns (person[] memory) {
       
        person[] memory _visits = new person[](visitorsAdds.length);

        // for (uint v = 0; v < visitorsAdds.length; v++) {
        //     person memory vAddress = visitors[visitorsAdds[v]];
        //     _visits[v] = vAddress;
        // }

        // return _visits;
        
    }
}


