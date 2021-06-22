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
            var addr='0x2Fb8C11A64d6902C9d03D396fD86E5A600934B0B';

            $(document).on('click','#submit',function() {  //After user clicks Submit button
              var instance = contract.at(addr);
              var estimatedGas = 3000000;
              var txnObject = {
                from: web3.eth.coinbase,
                gas: estimatedGas  }
                var batch= document.getElementById("batch").value
                var temp = document.getElementById("temp").value;
                var date = new Date();
                var seconds = date.getTime();

                instance.setTemp(batch,temp,seconds,txnObject,function(error, result){
                  alert("Data stored on BlockChain successfully")
                  if(error)
                  alert("error")
                });
              });


            })
