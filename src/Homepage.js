import { useEffect, useState } from 'react';
import {Container, Row} from 'react-bootstrap';
// import { fetchFromContract } from './FetchFromContract';
import { MyCard } from './MyCard';
import Web3 from 'web3';
async function fetchFromContract(contractAddress){
  const blockchainUrl = 'http://127.0.0.1:7545'; //blockchain url
  const web3 = new Web3(blockchainUrl);
  const response = await fetch('http://localhost:4000/api/ArtContract')
  const artContract = await response.json();
  const contract = new web3.eth.Contract(artContract.contractabi, contractAddress);
  const accounts = await web3.eth.getAccounts();

  //console.log(accounts);
  const content = await contract.methods.getArt().call({from:accounts[0]});
  const owner = await contract.methods.getOwner().call();
  const price = await contract.methods.getPrice().call();
  const isLicensor = await contract.methods.hasLicenseAlready(accounts[0]).call();
  //console.log(`art ${content}, owner ${owner}, price ${price}`)
  return {content, owner, price, isLicensor};
}
export function Homepage(prop){
  const [list, setList] = useState([]);
  useEffect(()=>{
    
    const setListFn = async () => {
    const response = await fetch('http://localhost:4000/api/explore')
    const contentList_ = (await response.json())
    const contentList = contentList_.data;
    const extendList = await Promise.all(contentList.map(async obj=>{
      const otherData = await fetchFromContract(obj.address);
        return {...obj, ...otherData};
      //return obj;
    }));
    setList(extendList);
    //return extendList;
    //console.log("contents: ", list);
  }
  setListFn()
}, []);
   return (
   <Container className='p-4'>
   {console.log("myList", list)}
   <Row>
    {list?<>
   {list.map((a)=><MyCard obj={a} style={{display:"inline-block"}}/>)}
   </>:<></>}
   </Row>
   </Container>);
 }
