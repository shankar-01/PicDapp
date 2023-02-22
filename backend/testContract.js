import Web3 from "web3";
import fs from 'fs';
let picDapp;
try {
	picDapp = JSON.parse(fs.readFileSync('./PicDappABI.json', 'utf8')).abi;
} catch (error) {
	console.error('Error:', error);
}
const address = "0x8fb3107040CE1ce290E2da9921e080aA70858D6e";
const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(picDapp, address);
const art = "abc";
const watermark = "xyz";
const price = 10;
const account = '0x1aE2481227ca792AbBf5413FF1aC2B1b1C64D48A';
contract.methods.addContent(art, watermark, price).send({from:account, gas:2000000})
.on('receipt', (receipt) => {
    // Check if the event was emitted
    if (receipt.events.MyEvent) {
      // Get the return value from the event
      const returnValue = receipt.events.MyEvent.returnValues.myValue;
      console.log('Return value:', returnValue);
    } else {
      console.error('Event not emitted');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
});
contract.methods.getContents(account).call()
  .then((returnValue) => {
    console.log('Return value:', returnValue);
  })
  .catch((error) => {
    console.error('Error:', error);
  });