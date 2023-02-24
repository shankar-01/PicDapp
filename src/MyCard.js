import { useState } from 'react';
import {Card, Button, Col} from 'react-bootstrap';
import Web3 from 'web3';
export function MyCard(prop){
    
    const [obj, setObj] = useState(prop.obj);
    const handlePurchase = async function(){
      const web3 = new Web3(window.ethereum);
      const artContractJson = await localStorage.getItem('artContract');
      const artContract = await JSON.parse(artContractJson);
      //console.log("my art contract ",artContract)
      const contract = new web3.eth.Contract(artContract.contractabi, obj.address);
      const accounts = await web3.eth.getAccounts();
      contract.methods.purchaseLicense().send({from:accounts[0], gas:2000000, value:obj.price})
      .on('receipt', (receipt) => {
          // Check if the event was emitted
          if (receipt.events.MyEvent) {
            // Get the return value from the event
            const returnValue = receipt.events.MyEvent.returnValues.myValue;
            setObj({...obj, content:returnValue, isLicensor:true});
            console.log('Return value:', returnValue);
          } else {
            console.error('Event not emitted');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
      });
    }
    const handleDownload = function(event){
      const fileUrl = `http://localhost:4000/download/${obj.content}`;
      const fileName = 'image.jpg';
      
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName;
      a.target = '_blank';
      a.style.display = 'none';
      document.body.appendChild(a);
      
      a.click();
      
      document.body.removeChild(a);
    }
    return (
      <Col md="4">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`http://localhost:4000/uploads/${obj.content}`} />
        <Card.Body>
          <Card.Title>{obj.title}</Card.Title>
          <Card.Text>Price : {obj.price}</Card.Text>
          <Card.Text>Owner : {obj.owner}</Card.Text>
          <Card.Text>
            {obj.description}
          </Card.Text>
          {obj.isLicensor?<Button variant="primary" onClick={handleDownload}>
            Download
            </Button>:
          <Button variant="primary" onClick={handlePurchase}>Purchase</Button>}
        </Card.Body>
      </Card>
      </Col>
    );
  }