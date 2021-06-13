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
  var addr='0x6c05175B6AF591Bd4626fC5Bb86582eF8179D666'

  $(document).on('click','#submit',function() {  //After user clicks Submit button
            var instance = contract.at(addr);
            var estimatedGas = 3000000;
            var txnObject = {
             from: web3.eth.coinbase,
             gas: estimatedGas  }
            var batch= document.getElementById("batch").value
            return instance.getTemp(1 ,txnObject,function(error, result){
               if(!error)
                { var table = document.getElementById("data");
                  for (var i = 0; i < result.length; i++) {
                    var row = table.insertRow(1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = result[i];
                    cell2.innerHTML = "NEW CELL2";
                    window.stop(); }
                  }
               else
                  alert("error")
                       });
            });


})
