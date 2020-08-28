var Election = artifacts.require("Election");
var BigNumber = require("bignumber.js");

contract("Election", function (accounts) {
  var electionInstance;

  it("initializes with two candidates", function () {
    return Election.deployed()
      .then(function (instance) {
        return instance.candidatesCount();
      })
      .then(function (count) {
        assert.equal(count, 2);
      });
  });

  it("it initializes the candidates with the correct values", function () {
    return Election.deployed()
      .then(function (instance) {
        electionInstance = instance;
        return electionInstance.candidates(1);
      })
      .then(function (candidate) {
        assert.equal(candidate[0], 1, "contains the correct id");
        assert.equal(candidate[1], "Candidate 1", "contains the correct name");
        assert.equal(candidate[2], 0, "contains the correct votes count");
        return electionInstance.candidates(2);
      })
      .then(function (candidate) {
        assert.equal(candidate[0], 2, "contains the correct id");
        assert.equal(candidate[1], "Candidate 2", "contains the correct name");
        assert.equal(candidate[2], 0, "contains the correct votes count");
      });
  });

  it("makes one election auditor transaction", function () {
    var cID = [1, 2];
    var sig = [];

    for (var i = 0; i < cID.length; i++) {
      var hash = web3.utils.soliditySha3(
        { type: "uint", value: cID[i] },
        { type: "address", value: "0x4F9e3d86576357dA6F86a0e118a5F3901d8353d5" }
      ); // calculate the sha3 of given input parameters in the same way solidity would (arguments will be ABI converted and tightly packed before being hashed)

      var signObject = web3.eth.accounts.sign(
        hash,
        "2417296936bbb66335c6c7b267709f39531ae5ca7427894df10a3ad7496747c9"
      );

      sig[i] = signObject;
    }

    return Election.deployed().then(function (instance) {
      return instance.vote([cID[0], cID[1]], [sig[0], sig[1]], 2, {
        from: accounts[2],
      });
    });
  });
});
