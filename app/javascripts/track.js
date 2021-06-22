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
  var addr="0x2Fb8C11A64d6902C9d03D396fD86E5A600934B0B";
  $(document).on('click','#submit',function() {  //After user clicks Submit button
            var instance = contract.at(addr);
            var estimatedGas = 3000000;
            var txnObject = {
             from: web3.eth.coinbase,
             gas: estimatedGas  }
            var batch= document.getElementById("batch").value;
            return instance.getTemp(batch ,txnObject,function(error, result){
               if(!error)
                { document.getElementById("record").style.display = "block";
                  document.getElementById("heading").innerHTML = "Past Temperature Record for BatchNo= "+batch;
                  var table = document.getElementById("data");
                  for (var i = 0; i < result[0].length; i++) {
                    var row = table.insertRow(1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = result[0][i];
                    const date=new Date(parseInt(result[1][i]));
                    cell2.innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"
                    +date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();}
                    instance.VaccineBatch.call(batch,function(err, res1){
                      var id=res1[0];
                      instance.VaccineType.call(id,function(err, res2){
                        document.getElementById("batch1").innerHTML="Vaccine BatchNo : "+res1[1];
                        document.getElementById("name").innerHTML="Vaccine Name : "+res2[0];
                        var life;
                        if(res1[3]==true)
                        life= "OK"
                        else
                        life= "Expired"
                        document.getElementById("life").innerHTML="Vaccine Life : "+life;
                      })

                    })
                  }
               else
                  alert("error")
                       });
            });


})
