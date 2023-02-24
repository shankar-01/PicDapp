import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Navbar } from './Navbar';
import { Upload } from './Upload';
import { ProfilePage } from './ProfilePage';
import { Homepage } from './Homepage';
import Web3 from "web3";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import { useState } from 'react';
import FirstPage from './FirstPage';




function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [userAdress, setUserAddress]   = useState("") ;

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
        console.log("no wallet")
      }
      if(provider){
        await provider.request({method: 'eth_requestAccounts'}) ;
        const web3 = new Web3(provider) ;
        const userAccount = await web3.eth.getAccounts() ;
        setIsConnected(true) ;
        setUserAddress(userAccount) ;
        //console.log(userAccount);
        provider.on("accountsChanged", async (accounts)=>{
          setUserAddress(userAccount);
        }); 
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    isConnected ? ( <div className="App"> 
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Homepage account={userAdress} />}>
          </Route>
          <Route 
          path="/upload"
           element={<Upload />}>
          </Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </Router>
    </div>  ) : <FirstPage handleClick={ConnectToWallet}/>
  );
}
export default App;
