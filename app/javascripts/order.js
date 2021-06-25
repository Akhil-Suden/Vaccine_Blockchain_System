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
            var instance = contract.at(addr);
            var estimatedGas = 3000000;
            var txnObject = {
              from: web3.eth.coinbase,
              gas: estimatedGas  }
              update_table();

              $(document).on('click','#submit',function() {  //After user clicks Submit button
                var vid= document.getElementById("vid").value;
                var qty = document.getElementById("qty").value;
                instance.order(vid,qty,txnObject,function(error, result){
                  if(!error){
                    setTimeout(function()
                    {instance.j.call(function(err, res){
                      if(!err){
                      const a=parseInt(res)-parseInt(qty)+parseInt(1);
                      const b=parseInt(res);
                      alert("Vaccines ordered from BatchNo "+a+" to "+b)
                      location.reload();}
                    });},3000);
                    }
                  });
                });

                function update_table(){
                  var table = document.getElementById("data");
                  instance.i.call(function(err, res){
                    for (var l = 1; l <= res; l++){
                      instance.VaccineType.call(l,function(err, res2){
                        var row = table.insertRow(-1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        cell1.innerHTML =res2[1];
                        cell2.innerHTML =res2[0];
                        cell3.innerHTML =res2[2]+" to "+res2[3];
                        cell4.innerHTML =res2[5];
                      });
                    }
                  });
                }
              })
