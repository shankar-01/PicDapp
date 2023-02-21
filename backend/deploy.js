import Web3 from 'web3';
import fs from 'fs';
let contractDetails;
try {
	contractDetails = JSON.parse(fs.readFileSync('./PicDappABI.json', 'utf8'));
} catch (error) {
	console.error('Error:', error);
}

const web3 = new Web3('http://127.0.0.1:7545');
const abi = contractDetails.abi;
const bytecode = contractDetails.bytecode;
const contract = new web3.eth.Contract(abi);
web3.eth.getAccounts().then((accounts) => {
  const firstAccount = accounts[0];
  console.log(`The first account is: ${firstAccount}`);
  contract.deploy({
    data: bytecode,
    arguments: []
  }).send({
    from: firstAccount, // the address of the account you want to deploy the contract from
    gas: 1500000, // the amount of gas you want to use for the deployment
    gasPrice: '30000000000' // the price you are willing to pay for each unit of gas
  }).then((newContractInstance) => {
    fs.writeFile('picDappAdd.txt', newContractInstance.options.address, (err) => {
      if (err) throw err;
      console.log('Address stored in picDappAdd.txt', newContractInstance.options.address);
    });
  });
}).catch((error) => {
  console.error(error);
});
