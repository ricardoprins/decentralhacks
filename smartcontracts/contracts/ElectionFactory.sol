pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;
import './Election.sol';


contract ElectionFactory {

mapping(uint256=>address) public electionAddresses;

function createNewElection(address signerAddress, uint256 _electionID) public returns (address created){
    
    //check that electionID does not exist first
    require(electionAddresses[_electionID] == 0x00);

    Election electionContractAddress = new Election(signerAddress);
    electionAddresses[_electionID] = electionContractAddress;
    //returns the new election contract address
    return electionContractAddress;
}

}