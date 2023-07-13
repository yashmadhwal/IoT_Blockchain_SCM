//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

// Importing Libraries
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";


contract InternetOfThingsContractMonitoring is Ownable{

    // Threshold Zones
    uint public yellowZone;
    uint public redZone;

    // tempState
    uint public tempState;

    // time Interval
    uint public timeGap;

    uint public id;

    // initializing information
    constructor() {
        timeGap = 10 seconds;
        id = 1;
    }

    // recording the product status in a time range
    struct productInfo{
        string destination;
        address sender;
        address recipient;
        address transporter;
        bool received;
    }

    // recording the product status in a time range
    struct sensorValue{
        uint logTime;
        uint timestamp;
        uint value;
        string signal;
    }

    struct logs{
        uint previousTimestamp;
        uint logCount;
    }

    // sensorValue[] public ProductInfo;

    // Checking the access and the roles
    mapping(address => bool) public userAccess;
    mapping(uint => productInfo) public productInformation;
    mapping(uint => sensorValue[]) public productMonitor;
    mapping(uint => logs) public logsPerId;

    function _toggelAccess(address _userAddress, bool _bool) private {
        userAccess[_userAddress] =_bool;
    }

    // Function to grant access
    function grantAccess(address _userAddress) external onlyOwner{
        // check current status
        require(userAccess[_userAddress] == false, 'Already has access');
        _toggelAccess(_userAddress, true);
    }

    // Function to revoke access
    function revokeAccess(address _userAddress) external onlyOwner{
        require(userAccess[_userAddress] == true, 'Already has no access');
        _toggelAccess(_userAddress, false);
    }

    // Setting the Zones:
    function setZones(uint _yellowZone,uint _redZone) public onlyOwner{
        yellowZone = _yellowZone; 
        redZone = _redZone;
    }

    function initializeProduct(string memory _destination, address _recipient, address _transportAddress) public onlyProducer{
        productInformation[id].destination = _destination;
        productInformation[id].recipient = _recipient;
        productInformation[id].sender = msg.sender;
        productInformation[id].transporter = _transportAddress;
        id++;

        // Initialize Time at 0:
        logsPerId[id].previousTimestamp = block.timestamp;
    }

    function productMovement(uint _productID, uint _value) public {
        // Product should Exist;
        require(_productID != 0,'Product does not exist');
        // assigned transporter should make this transaction
        require(productInformation[_productID].transporter == msg.sender,'Not authorised');
        // product should not be deliverd
        require(productInformation[_productID].received == false, 'Product already delivered');
        // Cannot make transactions if zones are not set
        require(yellowZone != 0,'Zones not yet defined');

        tempState = _value;
        // getting Current Timestamp
        uint currentTime = block.timestamp;
        // getting current log item
        uint currentLog = logsPerId[_productID].logCount;
        // console.log(currentLog);
        uint _previousTimestamp = logsPerId[_productID].previousTimestamp;

        require(currentTime > _previousTimestamp + timeGap,'Required Time not passed');
        // No violation
        if(_value < yellowZone){
            productMonitor[_productID].push(sensorValue(currentLog, block.timestamp,_value,'GREEN'));
        }
        else if(_value < redZone){
            productMonitor[_productID].push(sensorValue(currentLog, block.timestamp,_value,'YELLOW'));
        }
        else {
            productMonitor[_productID].push(sensorValue(currentLog, block.timestamp,_value,'RED'));
        }
        // updating timestamp
        logsPerId[_productID].previousTimestamp = currentTime;
        logsPerId[_productID].logCount = currentLog+1;
    }

    // Received Product 
    function receiveProduct(uint _productID) public {
        // Check if the correct receiver
        require(productInformation[_productID].recipient == msg.sender, 'Not correct receipent');
        require(productInformation[_productID].received == false, 'Product already delivered');
        // marking product received
        productInformation[_productID].received = true;
    } 

    //   get Product information
    function getProductionJourney(uint _productID) public view returns(sensorValue[] memory){
        uint _count = logsPerId[_productID].logCount;
        sensorValue[] memory _id = new sensorValue[](_count);
        for (uint i = 0; i < _count; i++) {
            
            sensorValue storage member = productMonitor[_productID][i];
            _id[i] = member;
        }
        return _id;
    }

    modifier onlyProducer() {
        require(userAccess[msg.sender] == true, 'No Access: not a producer');
        _;
    } 
}