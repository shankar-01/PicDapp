import { useState } from "react";
import ethIcon from "./ethIcon.png";
import Web3 from "web3";
export function ProfilePage(){
  let [isEdit, setIsEdit] = useState(false); 
  var [imageUrl, setImageUrl] = useState("http://placehold.it/200x200");
  var [name, setName] = useState("Name") ;
  let [account, setAccount] = useState(null);

 const handleEdit = ()=>{
  setIsEdit(t => !t) ;
 }
 const handleNameChange = (event)=>{
  setName(()=> event.target.value) ;
 }
 const handleFileChange = (event)=> {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const imageUrl = event.target.result;
    setImageUrl(() => imageUrl);
  };

  reader.readAsDataURL(file);
 }
 const ConnectToWallet = async() => {
  try{
    let provider; 
    if(window.ethereum){
      provider = window.ethereum ;
    }
    else if((window.web3)){
      provider = window.web3 ;
    }
    else{
      console.log("No wallet found") ;
    }
    if(provider){
      await provider.request({method: 'eth_requestAccounts'}) ;
      const web3 = new Web3(provider) ;
      const userAccount = await web3.eth.getAccounts() ;
      await fetch('http://localhost:4000/api/account', {
          method: 'POST',
          body: JSON.stringify({ethAddress:userAccount[0]}),
          headers: { 'Content-Type': 'application/json' },
        })
        .then(async account =>{
          account = await account.json()
          
          console.log(account._id);
          
          setAccount(account.ethAddress);
          if(account.profile){
            setImageUrl("http://localhost:4000/uploads/"+account.profile);
          }
          if(account.name){
            setName(account.name);
          }
          
      })
        .catch(error => {
          console.error('Error connecting account ', error);
        });
      
      provider.on("accountsChanged", async (accounts)=>{
        console.log("62");
        await fetch('http://localhost:4000/api/account', {
          method: 'POST',
          body: JSON.stringify({ethAddress:accounts[0]}),
          headers: { 'Content-Type': 'application/json' },
        })
        .then(async account =>{
          account = await account.json()
          
          console.log(account._id);
          
          setAccount(account.ethAddress);
          if(account.profile){
            setImageUrl("http://localhost:4000/uploads/"+account.profile);
          }
          
          if(account.name){
            setName(account.name);
          }
          
      })
        .catch(error => {
          console.error('Error connecting account ', error);
        });
        //database query for account creation and logging

      });
      //let ethBalance = await web3.eth.getBalance(account) ;
    }
  }catch(err){
    console.log(err);
  }
}
ConnectToWallet();
  return (
    <div>
    {account?<div>
      {!isEdit ? <UserInfo handleEdit={handleEdit} name={name} imageUrl={imageUrl} account={account}/>
      : <Editing handleEdit={handleEdit} 
      handleFileChange={handleFileChange} 
      imageUrl={imageUrl} 
      handleNameChange={handleNameChange}
      name={name} 
      />}
    </div>:<></>}
    </div>
    );
}
function Editing(props){
  return (
    <div className='EditingSection'>
      <div className='imageChose'>
        <h3>profile image</h3>
        <img src={props.imageUrl} alt="profile image" className="imgProfile"/>
        <input type="file" accept="image/*" className='form-control' onChange={props.handleFileChange}/>
      </div>
      <div className='imageChose'>
        <div class="mb-3 row">
          <label for="inputName" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputName"  value={props.name} onChange={props.handleNameChange}/>
          </div>
         </div>
      </div>
      <p className="editButton" onClick={props.handleEdit}>Done</p>
    </div>
  )
}
function UserInfo(props){
  return(
    <div className='d-flex juctify-content-left profiledetails'>
      <img src={props.imageUrl} alt='Profile pic' className='imgProfile' />
      <div className='profileText'>
        <h1 >{props.name}</h1>
        <div className='d-flex justify-content-left'>
          <img src={ethIcon} alt='eth icon' className='ethIcon1'/>
          <p className='text-muted'>{props.account}</p>
        </div>
        <p className="editButton" onClick={props.handleEdit}>edit</p>
      </div>
      
    </div>
  );
}