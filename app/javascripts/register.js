import Vaccine from "../../build/contracts/Vaccine.json";
import $ from "jquery";

window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();}
      catch (error) {
        alert("Error in connection")
        alert(error) }}
        else if (window.web3) {
          window.web3 = new Web3(web3.currentProvider);
          web3.eth.sendTransaction({});}
          else {
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!');}

            var accounts= await web3.eth.accounts;
            web3.eth.defaultAccount = web3.eth.accounts[0];
            var abiFactory= JSON.stringify(Vaccine.abi)
            var abi=JSON.parse(abiFactory);
            var contract = web3.eth.contract(abi);
            var addr='0x3DD443736Cc589fd4456B02f8E7f99E3e6f87883'

            $(document).on
            ('click','#submit',function() {  //After user clicks Submit button
              var instance = contract.at(addr);
              var estimatedGas = 3000000;
              var txnObject = {from: web3.eth.coinbase, gas: estimatedGas  }
              var vname= document.getElementById("vname").value;
              const min = parseInt(document.getElementById("min").value);
              const max = document.getElementById("max").value;
              var qty = document.getElementById("qty").value;
              instance.register.sendTransaction(vname,min,max,qty,txnObject,function(error,result){
                if (!error) {
                  alert("Registration Succesfull");
                }});
              });

              $(document).on
              ('click','#add',function() {  //After user clicks Add button
                var instance = contract.at(addr);
                var estimatedGas = 3000000;
                var txnObject = {from: web3.eth.coinbase, gas: estimatedGas  }
                var vid= document.getElementById("vid1").value;
                var qty = document.getElementById("qty1").value;
                instance.addQty.sendTransaction(vid,qty,txnObject,function(error,result){
                  if (!error) {
                    alert("Quantity Added Succesfully");
                  }});
                });
              })
