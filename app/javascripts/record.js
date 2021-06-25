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
            var addr='0x3DD443736Cc589fd4456B02f8E7f99E3e6f87883';
            var instance = contract.at(addr);
            var estimatedGas = 3000000;
            var txnObject = {
              from: web3.eth.coinbase,
              gas: estimatedGas  }
            update_table();

            $(document).on('click','#submit',function() {  //After user clicks Submit button
                var batch= document.getElementById("batch").value
                var temp = document.getElementById("temp").value;
                var date = new Date();
                var seconds = date.getTime();

                instance.setTemp(batch,temp,seconds,txnObject,function(error, result){
                  alert("Data stored on BlockChain successfully")
                  if(error)
                  alert("Enter valid BatchNo")
                });
              });

              function update_table(){
                var table = document.getElementById("data");
                instance.o.call(function(err, res){
                  for (var j = 1; j <= res; j++){
                    instance.ohistory.call(j-1,function(err, res2){
                      var row = table.insertRow(-1);
                      var cell1 = row.insertCell(0);
                      var cell2 = row.insertCell(1);
                      var cell3 = row.insertCell(2);
                      cell1.innerHTML =res2[0];
                      instance.VaccineType.call(res2[0],function(err, res3){
                        cell2.innerHTML =res3[0];
                      })
                      const a=parseInt(res2[1])+parseInt(res2[2])-1;
                      cell3.innerHTML =res2[1]+" to "+a;
                    });
                  }
                });
              }


            })
