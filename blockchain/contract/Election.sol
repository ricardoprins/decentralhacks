pragma solidity ^0.4.23;
//pragma experimental ABIEncoderV2;

contract Election {
// Model a Candidate
 struct Candidate {
	uint id;
	string name;
	uint voteCount;
}
uint iterate=0;



//Model a voter
struct Voter {
  bytes32 signedBlindedVote;  // blind signature of casted vote
}
// Candidate ID mapped with candidate struct
mapping(uint => Candidate) public candidates;

// voter id mapped with voter's details and vote details
mapping(uint => Voter) public voters;

// event for logging successful votes
event votedEvent(
  uint indexed _candidateId
  );

  modifier onlyVerifier(address _toCheck){
    require(_toCheck == _signerAddress,"you are b=not the election verifier");
    _;
  }
// event for logging successful verification

event verificationSuccess();  // emits when signature is successfully verified

// Store Candidates Count
uint public candidatesCount;   // counter cache for candidates
//uint public votersCount;    // counter cache for voters

// variable that keeps signer's public key for the electionb
//bytes32[] voterSigs;
address _signerAddress;
constructor(address signerAddress) public {
  addCandidate("Candidate 1");
	addCandidate("Candidate 2");
//  addVoter(100);   addvoter() function is not used in constructor statement because it invokes require(), but the contract hasn't beem created before constructor call
//  addVoter(200);
_signerAddress=signerAddress;
  }


// candidates are pre populated for the election (privately intitialized by the contract)
function addCandidate(string _name) private {
candidatesCount++;
candidates[candidatesCount] = Candidate(candidatesCount, _name, 0); // Candidate(ID, NAME, VOTECOUNT)
}

/** REMOVING SINCE VOTERS ARE NOT REGISTERING FOR THE ELECTION THROUGH THE CONTRACT
// anyone can register for the election
function addVoter(uint _nationalID) public {
require(voters[msg.sender].eligibility == false && voters[msg.sender].NID != _nationalID);  //checks if voter has registered before with same NID / Disallows Double Registration
votersCount++;
voters[msg.sender] = Voter(_nationalID,true,false,"");   // (NID, eligibility, hasVoted, signedBlindedVote)
emit newVoter(_nationalID);
}
**/
function submitVotes(uint256 _candidateId, bytes32 _blindsignature) public onlyVerifier(msg.sender) {
/**     
for(uint i=counterSum;i<counterSum+counter;i++)       
{
    voterSigs[i]=_blindsignature[i];
}


        //not necessary since voters are not interacting with contract
/**
        // registered voter check
       require(voters[msg.sender].eligibility == true);

        // require that they haven't voted before
        require(!voters[msg.sender].hasVoted);
**/
       // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        // require a valid signature
        //for(i=0;i<counter;i++){
        require(signatureVerification(_candidateId,_blindsignature),"signature incorrect");

        // record that voter's verified blind signature
        voters[iterate].signedBlindedVote = _blindsignature;

        // record that voter has voted
       // voters[i].hasVoted = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount++;
        
        //trigger voted event
        emit votedEvent(_candidateId);

}

function signatureVerification(uint _candidateId, bytes32 signature) public returns (bool) {
    //  Nonce scheme can be implemented later
    // require(!usedNonces[nonce]);
    // usedNonces[nonce] = true;

            // following statement recreates the message that was signed on the client
            bytes32 message = prefixed(keccak256(abi.encodePacked(_candidateId, address(this))));

            if(recoverSigner(message, signature) == _signerAddress) {
              emit verificationSuccess();    //event call
              return true;
            }
            else return false;
}

/// builds a prefixed hash to mimic the behavior of eth_sign (concatenates a prefix, message length and the message itself then hashes it)
function prefixed(bytes32 hash) internal pure returns (bytes32) {
      return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
  }

function recoverSigner(bytes32 message, bytes32 sig) internal pure returns (address){
      uint8 v;
      bytes32 r;
      bytes32 s;
      (v,r,s) = splitSignature(sig);
      return ecrecover(message, v, r, s);     //core function that uses ECC to recover the signer address
}
/// signature methods.
function splitSignature(bytes32 sig) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
      require(sig.length == 65);
      assembly {
          // first 32 bytes, after the length prefix.
          r := mload(add(sig, 32))
          // second 32 bytes.
          s := mload(add(sig, 64))
          // final byte (first byte of the next 32 bytes).
          v := byte(0, mload(add(sig, 96)))
      }
      return (v, r, s);
}

}
