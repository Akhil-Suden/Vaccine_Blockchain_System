App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

initContract: function() {
  $.getJSON('Vaccine.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with @truffle/contract
  var  VaccineArtifact = data;
  App.contracts.Vaccine = TruffleContract(VaccineArtifact);

  // Set the provider for our contract
  App.contracts.Vaccine.setProvider(App.web3Provider);
});

  return App.bindEvents();
  },

  bindEvents: function() {
  $(document).on('click','#submit', App.handleRecord);
  },

  handleRecord: function(event) {
  var batch= $("#batch").val();
  var temp= parseInt($("#temp").val());
  var recordInstance;

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var account = accounts[0];

    App.contracts.Vaccine.deployed().then(function(instance) {
      adoptionInstance = instance;
      return recordInstance.takevalue(batch, temp, {from: account});
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
