import { useEffect, useState } from 'react';
import {Container, Row} from 'react-bootstrap';
// import { fetchFromContract } from './FetchFromContract';
import { MyCard } from './MyCard';
import Web3 from 'web3';
async function fetchFromContract(contractAddress){
  //const blockchainUrl = 'http://127.0.0.1:7545'; //blockchain url
  const web3 = new Web3(window.ethereum);
  const response = await fetch('http://localhost:4000/api/ArtContract')
  const artContract = await response.json();
  localStorage.setItem('artContract', JSON.stringify(artContract))
  const contract = new web3.eth.Contract(artContract.contractabi, contractAddress);
  const accounts = await web3.eth.getAccounts();
  console.log("my art acc: ", accounts);
  //console.log(accounts);
  const content = await contract.methods.getArt().call({from:accounts[0]});
  const owner = await contract.methods.getOwner().call();
  const price = await contract.methods.getPrice().call();
  const isLicensor = await contract.methods.hasLicenseAlready(accounts[0]).call();
  //console.log(`art ${content}, owner ${owner}, price ${price}`)
  return {content, owner, price, isLicensor};
}
export function MyArts(prop){
  const [list, setList] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(()=>{
    
    const setListFn = async () => {
    const web3 = new Web3(window.ethereum);
    const picDappStr = await fetch('http://localhost:4000/api/PicDappContract');
    const picDapp = await picDappStr.json();
    // console.log(picDapp.contract_address);
    const contract = new web3.eth.Contract(picDapp.contractabi, picDapp.contract_address);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log("my acc ", account);
    const contentList = await contract.methods.getContents(account).call();
    console.log("contents ", contentList);
    const extendList = await Promise.all(contentList.map(async obj=>{
      const otherData = await fetchFromContract(obj);
      console.log("contract data", otherData);
      const dbData = await fetch(`http://localhost:4000/contents/${obj}`);
      console.log("db ",dbData);
      const data = await (await dbData.json()).data;
      console.log(data);
        return {...data, ...otherData};
      //return obj;
    }));
    window.ethereum.on("accountsChanged", async (accounts)=>{
      setFlag(!flag);
    });
    Promise.all([setList(extendList)]);
    //return extendList;
    //console.log("contents: ", list);
  }
  setListFn()
}, [flag]);
   return (
   <Container className='p-4'>
   
   <Row>
    {list?<>
   {list.map((a, i)=><MyCard obj={a} key={i} style={{display:"inline-block"}}/>)}
   </>:<></>}
   </Row>
   </Container>);
 }
