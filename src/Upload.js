import {Button} from 'react-bootstrap';
import { useRef } from 'react';
import uploadIcon from "./uploadIcon.png"
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Web3 from "web3";
export function Upload(prop){
    const fileInputRef = useRef(null);
    const reader = new FileReader();
    const [file, setFile] = useState(null);
    const [picDapp, setPicDapp] = useState(null); //PicDapp Contract details

  useEffect(() => {
    // fetch data from server
    fetch('http://localhost:4000/api/PicDappContract')
      .then(response => response.json())
      .then(data => setPicDapp(data))
      .catch(error => console.error(error));
  }, []);
    const [show, setShow] = useState(null);
    const handleClose = () => setShow(false);
    const handleClick = () => {
      fileInputRef.current.click();
    };
    const handleSubmit = (event)=> {
        event.preventDefault();

        const formData = new FormData();
        const title = document.getElementById("titleTxt").value;
        const description = document.getElementById("descriptionTxt").value;
        const price = Number(document.getElementById("priceTxt").value);
        formData.append('image', file);
        formData.append('title', title);
        formData.append('description', description);
        fetch('http://localhost:4000/api/upload', {
          method: 'POST',
          body: formData
        })
        .then(async response => {
            response = await response.json();
            const art = response.imageLink;
            const watermark = response.watermarkImgLink;
            //access contract
            const web3 = new Web3('http://localhost:7545');
            const contract = new web3.eth.Contract(picDapp.contractabi, picDapp.contract_address);
            //call function of buy (art, watermark, price)
            contract.methods.addContent(art, watermark, price).call((err, result)=>{
              if(err){
                console.log(err);
              }
              console.log(result);
            });
            // store it on db (address, title description)
            setShow(true);
        })
        .catch(error => {
          console.error('Error uploading image', error);
        });
      }
    const handleFileChange = (event) => {

      reader.onload = (event) => {
      let image = document.getElementById("uploadImg");
      image.src = event.target.result;
      //image.style.width = "80%";
      };
      reader.readAsDataURL(event.target.files[0]);
      // Perform any other actions with the selected file
      setFile(event.target.files[0]);
    };
    return (<div>
      <img src={uploadIcon} id="uploadImg"/><br />
      {file?<>
      <input type="number" style={{width:"60%"}} placeholder="Price in Wei" id="priceTxt"/><br/><br/>
      <input type="text" style={{width:"60%"}} placeholder="Title" id="titleTxt"/><br/><br/>
      <input type="text" style={{width:"60%"}} placeholder="Description" id="descriptionTxt"/><br/><br/>
      </>:<></>}
      <Button onClick={handleClick} id="uploadBtn">Browse</Button>
      <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {file?<Button onClick={handleSubmit} id="uploadBtn" style={{marginLeft:"2%"}}>Upload</Button>:<></>}
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>"Uploaded"</Modal.Title>
        </Modal.Header>
        <Modal.Body>your image uploaded successfully!</Modal.Body>
        <Modal.Footer>
          <Link to="/exploreContent"><Button variant="primary" onClick={handleClose}>
            OK
          </Button></Link>
        </Modal.Footer>
      </Modal>

    </div>);
  }
