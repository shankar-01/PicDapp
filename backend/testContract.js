import Web3 from "web3";
import fs from 'fs';
let picDapp;
try {
	picDapp = JSON.parse(fs.readFileSync('./PicDappABI.json', 'utf8')).abi;
} catch (error) {
	console.error('Error:', error);
}
const address = "0x5E56e848aD13fc94c88C977f5EAEcd2c99474F27";
const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(picDapp, address);
const art = "abc";
const watermark = "xyz";
const price = 10;
const account = '0xa399AA039F337976e4BC8E2CB00aaa7E427b0B49';
/*contract.methods.addContent(art, watermark, price).send({from:account, gas:2000000})
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
});*/
contract.methods.getContents(account).call()
  .then((returnValue) => {
    console.log('Return value:', returnValue);
  })
  .catch((error) => {
    console.error('Error:', error);
  });