import { useState } from 'react';
import {Button} from 'react-bootstrap';
import Web3 from "web3";
export function ExploreContent(props){
    /*const { address, account } = props.location.state;
    const fetch = require('node-fetch');
    const [title, setTitle] = useState(null);
    const [buy, setBuy] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [contract, setContract] = useState(null);
    useEffect(() => {
      // fetch data from server
      fetch('http://localhost:4000/api/ArtContract')
        .then(response => response.json())
        .then(data => setContract(data.contractabi))
        .catch(error => console.error(error));
    }, []);
    fetch(`http://localhost:4000/contents/${address}`)
    .then(response => response.json())
    .then(data => {
      setTitle(data.data.title);
      setDescription(data.data.description);
      const web3 = new Web3(window.ethereum);
      const artContract = new web3.eth.Contract(contract, address);
      artContract.methods.getArt().call()
      .then((returnValue) => {
        setImage(`http://localhost:4000/uploads/${returnValue}`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      artContract.methods.hasLicenseAlready(account).call()
      .then((returnValue) => {
        setBuy(returnValue)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    })
    .catch(error => console.error(error));*/

    return (
    <div>
      <img src={props.image} style={{width:"50%"}}/><br/>
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <Button>
      {
        true?"Download":"Buy"
      }
      </Button>
    </div>);
  }