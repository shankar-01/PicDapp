import logoImg from "./pdapp.png"
import profileImg from "./profileIcon.png"
import addImg from "./addImageIcon.png"
import { Link } from 'react-router-dom';
export function Navbar(prop){
    return (
    <div class="navbar" style={{background:"purple", display: "flex", alignSelf: "center"}}>
    <div style={{display: "flex",justifyContent: "start",  width:"50%"}}>
    <Link to="/" style={{width:"100%"}}><img src={logoImg} style={{width:"5%"}}/></Link>
    </div>
    <div style={{display: "flex",justifyContent: "end", width:"30%"}}>
    <Link to="/profile" style={{width:"100%"}}><button style={{width:"25%", background:"transparent", border:"none"}} ><img src={profileImg} style={{width:"100%"}}/></button></Link>
    <Link to="/upload" style={{width:"100%"}}><button style={{width:"25%", background:"transparent", border:"none"}}><img src={addImg} style={{width:"100%"}}/></button></Link>
    </div>
    </div>);
}