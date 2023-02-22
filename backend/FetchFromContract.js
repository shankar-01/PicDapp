import Web3 from "web3";
export function fetchFromContract(contractAddress){
    const blockchainUrl = 'http://127.0.0.1:7545'; //blockchain url
    const web3 = new Web3(blockchainUrl);
    let contract;
    let accounts;
    web3.eth.getAccounts().then(acs=>{
      accounts = acs;
    });
    let content;
    let owner;
    let isLicensor;
    let price;
    fetch('http://localhost:4000/api/ArtContract').then(res=>res.json()).then(resp=>{
      const artContract = resp;
      //console.log(artContract)
      contract = new web3.eth.Contract(artContract.contractabi, contractAddress);
      contract.methods.getArt().call({from:accounts[0]}).then(res=>{
        content = res;
        contract.methods.getOwner().call().then(res=>{
          owner = res;
          contract.methods.getPrice().call().then(res=>{
            price = res;
            contract.methods.hasLicenseAlready(accounts[0]).call().then(res=>{
              isLicensor = res;
              console.log(content, " ", owner, " ", price, " ", isLicensor);
            });
          });
        });
      });
    });
    
  }
fetchFromContract("0xb831D3af3ddA608A4750aA365174Cb4bd557DF02");