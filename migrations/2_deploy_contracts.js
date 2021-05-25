var Vaccine = artifacts.require("Vaccine");

module.exports = function(deployer) {
  deployer.deploy(Vaccine);
};
