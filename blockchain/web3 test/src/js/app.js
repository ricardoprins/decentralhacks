App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  signerAccount: '0xb0c4df6950ef538df20f89d4857842fb93b8343931a416d127173cad7cca9345',  //demo signer's off chain private key (not present in any node) [address - 0xB131dFD7Bd2edfACCf04531A8181da0EAa1641Ad]
  // pass live blockchain election contract address here
  contractAddress: '0xC88A235f6E63384DB9f4075A6AffD53CEB5794aB',  //  deployed demo contract Address on mumbai testnet
 
  // pass live blockchain factory contract address here  
  factorycontractAddress: '0x241512C692Dea2eA84B13F706Eca8E3424881C2f',
  

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
// Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
     window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  window.web3.currentProvider.enable();
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);
},

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);
     App.listenForEvents();  // event listener call for votecasting event
       
    });


     $.getJSON("ElectionFactory.json", function(factory) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.ElectionFactory = TruffleContract(factory);
      // Connect provider to interact with contract
      App.contracts.ElectionFactory.setProvider(App.web3Provider);
      
    });

     return App.render();
  },

//event listener function for Vote casting
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance){
      instance.votedEvent({},{
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error,event){
        console.log("voting event triggered",event);
      })
    })
  },
 

render: function() {
  
  // Load account data
  var account = web3.eth.getAccounts()[0];
  
      App.account = account;
      $("#accountAddress").html("Your Account: " + account);
    
  
  //console.log("accounts[1] - " + web3.eth.accounts[1]);
},

castVote: function() {    // function is called  during vote casting
    var candidateId = 2;
    var cID = [1,2];
    var sig = [];
    console.log(cID[0]," + ",cId[1]);
    for (var i =0 ; i< cID.length ; i++){
      
      var blindSig = App.PrepareBlindVote(cID[i], App.contractAddress);
      console.log("Returned signature : " + blindSig);
      sig[i] = blindSig;
    }
    

    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(...cID, ...sig, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      //Reload everything when a new vote is recorded
     App.init();
    }).catch(function(err) {
      console.error(err);
    });
  },

PrepareBlindVote: function(candidateId, contractAdd) {
    var hash = web3.utils.soliditySha3({type: 'uint', value: candidateId}, {type: 'address', value: contractAdd}); // calculate the sha3 of given input parameters in the same way solidity would (arguments will be ABI converted and tightly packed before being hashed)

    console.log("Original HASH " + hash);
    var signature = App.signBlindVote(hash);
    console.log("HI Signature " + signature);
    return signature;
},

signBlindVote: function(hash) {
    var signObject = web3.eth.accounts.sign(hash, App.signerAccount);
    console.log("Original message " + signObject.message);
    console.log("Original messagehash " + signObject.messageHash);
    console.log("Original Signature " + signObject.signature);
    return signObject.signature;
},

createVoter: function() {   // function is called  during voter registration
      var voterNationalID = $('#voterNID').val();
      console.log(voterNationalID);
      App.contracts.Election.deployed().then(function(instance) {
        return instance.addVoter(voterNationalID, { from: App.account });
      }).then(function(result) {
        // Wait for votes to update
        $("#content").hide();
        $("#loader").show();

        //Reload everything when a new voter is created
        App.init();
      }).catch(function(err) {
        console.error(err);
      });
    }
}

  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
