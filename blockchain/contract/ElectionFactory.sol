pragma solidity ^0.4.23;
import './Election.sol';


contract ElectionFactory {
mapping(uint256=>address) public electionAddresses;
//contract creation Fee is in unit of ethers
uint256 electionCreationFee=(1 ether*1)-1 ether;
address master;
constructor(uint256 creationFee,address _grandMaster) public{
    electionCreationFee=creationFee;
    msg.sender==_grandMaster;
    master=_grandMaster;
}

modifier onlyMaster(address _target ) {
    require(_target==master,"you are not the grandmaster");
    _;
}


function createNewElection(address signerAddress, uint256 _electionID) public payable returns (address created){
    //check that electionID does not exist first
    require(electionAddresses[_electionID]==0x00);

    //then require that the fee is sent
    require(msg.value>=electionCreationFee,"Not enough ether");
    //returns extra payment back
  if(msg.value>electionCreationFee){
      uint _change = msg.value-  electionCreationFee;
      uint _toPay=msg.value-_change;
      master.transfer(_toPay);
     msg.sender.transfer(_change);
  }
  else{
      master.transfer(msg.value);
    Election electionContractAddress=new Election(signerAddress);
    electionAddresses[_electionID]=electionContractAddress;
    //returns the new election contract address
    return electionContractAddress;
}
}
 
 function changeFee(uint _newFee) public onlyMaster(msg.sender) {
     electionCreationFee=_newFee;
 }

}