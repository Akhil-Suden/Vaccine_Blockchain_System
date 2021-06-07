App = {
  web3Provider: null,
  contracts: {},
  account: '0x98d35dA636c89b67857D3772Eb0c1407474d4300',
  initWeb3: async function() {
        if (window.ethereum) {
          App.web3Provider = window.ethereum;
          try {
            await window.ethereum.enable();            // Request account access
            console.log("connected to web3Provider");
          } catch (error) {
            console.error("User denied account access")
          }
        }
        else if (window.web3) {             // Legacy dapp browsers...
          App.web3Provider = window.web3.currentProvider;
        }
        else {
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');  //Ganache
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
  },

initContract: function() {
  $.getJSON("Vaccine.json", function(data) {
    var VaccineArtifact = data;
    App.contracts.Vaccine = TruffleContract(VaccineArtifact);
    App.contracts.Vaccine.setProvider(App.web3Provider);
  });

  return App.bindEvents();
  },

  bindEvents: function() {
  $( "form" ).submit(App.handleRecord);
  },

  handleRecord: function(event) {
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
  //    alert(error);
      } else {
        App.account = accounts[0];
      }
    });
    App.contracts.Vaccine.deployed().then(function(instance) {
      VaccineInstance = instance;
      return VaccineInstance.initialise();
    }).then(function(result) {
      var initialisedEvent = VaccineInstance.initialised();
      alert("d")
    }).catch(function(err){
       alert(err);
});  // alert(App.account)

  }

};

$(function() {
   $(window).load(function() {
    App.initWeb3();
  });
});
