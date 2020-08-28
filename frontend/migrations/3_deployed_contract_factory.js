var Factory = artifacts.require("ElectionFactory");

module.exports = function(deployer) {
    deployer.deploy(Factory);
};