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
            var addr='0xd278B4eF97999d7d49bF3bc6598e4613Bff0B928'

            $(document).on('click','#submit',function() {  //After user clicks Submit button
              var instance = contract.at(addr);
              var estimatedGas = 3000000;
              var txnObject = {from: web3.eth.coinbase, gas: estimatedGas  }
              var vname= web3.fromAscii(document.getElementById("vname").value)
              var min = document.getElementById("min").value;
              var max = document.getElementById("max").value;
              instance.RegisterVaccine.sendTransaction(vname,min,max,txnObject,function(result){
                alert("ddddddddddd");
                var userAddedEvent = instance.registered();
                userAddedEvent.watch(async function(error, result){
                  if (!error) {
                    alert("ddddddddddd");
                  }
                });
                });

              //    alert("Data stored on BlockChain successfully") ;
               /* var table = document.getElementById("data");
                  for (var j = 0; j < instance.i; j++) {
                  var row = table.insertRow(1);
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);
                  cell1.innerHTML = VaccineType[j].VaccineID;
                  cell2.innerHTML = VaccineType[j].name;
                  cell3.innerHTML = VaccineType[j].min+" to "+VaccineType[j].min;
                  window.stop(); }  */

          //    window.stop();
            });

          })
