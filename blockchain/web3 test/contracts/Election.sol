pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract Election {
// Model a Candidate
 struct Candidate {
	uint id;
	string name;
	uint voteCount;
}
uint counterSum=0;



//Model a voter
struct Voter {
  uint NID;     // govt issued national identification number of candidate
  bool eligibility;      // stores the valid list of voters during registration
  bool hasVoted;    // updates when vote is successfully casted on blockchain
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
// event for logging successful verification

event verificationSuccess();  // emits when signature is successfully verified

// event for logging successful voter registration
event newVoter(
  uint indexed _nationalID
);

// Store Candidates Count
uint public candidatesCount;   // counter cache for candidates
uint public votersCount;    // counter cache for voters

// variable that keeps signer's public key for the electionb
bytes32[] voterSigs;
address _signerAddress;

constructor(address signerAddress) public {
  addCandidate("Candidate 1");
	addCandidate("Candidate 2");

_signerAddress = signerAddress;
  }

// candidates are pre populated for the election (privately intitialized by the contract)
function addCandidate(string _name) private {
candidatesCount++;
candidates[candidatesCount] = Candidate(candidatesCount, _name, 0); // Candidate(ID, NAME, VOTECOUNT)
}


function vote(uint[] _candidateId,bytes32[] _blindsignature,uint256 counter) public {
    
for(uint i = counterSum; i < counterSum + counter; i++)       
{
    voterSigs[i]=_blindsignature[i];
}
 
      //  // require a valid candidate
      //  require(_candidateId > 0 && _candidateId <= candidatesCount);

        // require a valid signature
        for(i=0;i<counter;i++){
        require(signatureVerification(_candidateId[i],_blindsignature[i]),"signature incorrect");

        // record that voter's verified blind signature
        voters[i].signedBlindedVote = _blindsignature[i];

        // record that voter has voted
        voters[i].hasVoted = true;

        // update candidate vote Count
        candidates[_candidateId[i]].voteCount++;
        
        //trigger voted event
        emit votedEvent(_candidateId[i]);
    }
    counterSum+=counter;

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
