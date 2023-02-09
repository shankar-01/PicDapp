import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container, Card, Button, Col, Row} from 'react-bootstrap';
import { MDBCol } from "mdbreact"
import logoImg from "./pdapp.png"
import profileImg from "./profileIcon.png"
import addImg from "./addImageIcon.png"
import uploadIcon from "./uploadIcon.png"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
function App() {
 
  return (
    <div className="App"> 
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Homepage/>}>
          </Route>
          <Route 
          path="/upload"
           element={<Upload />}>
          </Route>
          <Route path="/exploreContent" element={<ExploreContent/>}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
        </Routes>
      </Router>
    </div>  
  );
}
function ProfilePage(){
  return (<p>Name</p>);
}
function ExploreContent(prop){
  let flag = true;
  return (
  <div>
    <img src="https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg" style={{width:"50%"}}/><br/>
    <Button>
    {
      flag?"Download":"Buy"
    }
    </Button>
  </div>);
}
function Upload(prop){
  return (<div>
    <img src={uploadIcon} /><br />
    <Button>Browse</Button>
  </div>);
}
function Homepage(prop){
   let list = [
    {title:"Me", text:"Flower is beautiful.", image:'https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg'},
    {title:"Me", text:"Flower is beautiful.", image:'https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg'}
  ];
  return (
  <Container className='p-4'>
  <Row>
  {list.map((a)=><MyCard obj={a} style={{display:"inline-block"}}/>)}
  </Row>
  </Container>);
}
function Navbar(prop){
  return (
  <div class="navbar" style={{background:"purple", display: "flex", alignSelf: "center"}}>
  <div style={{display: "flex",justifyContent: "start",  width:"70%"}}>
  <Link to="/" style={{width:"100%"}}><img src={logoImg} style={{width:"5%"}}/></Link>
  <SearchBar />
  </div>
  <div style={{display: "flex",justifyContent: "end", width:"30%"}}>
  <Link to="/profile" style={{width:"100%"}}><button style={{width:"25%", background:"transparent", border:"none"}}><img src={profileImg} style={{width:"100%"}}/></button></Link>
  <Link to="/upload" style={{width:"100%"}}><button style={{width:"25%", background:"transparent", border:"none"}}><img src={addImg} style={{width:"100%"}}/></button></Link>
  </div>
  </div>);
}

function SearchBar(prop){

  return (
  <MDBCol md="6">
  <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
</MDBCol>);
}
function MyCard(prop){
  let obj = prop.obj;
  return (
    <Col md="4">
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={obj.image} />
      <Card.Body>
        <Card.Title>{obj.title}</Card.Title>
        <Card.Text>
          {obj.text}
        </Card.Text>
        <Button variant="primary">Buy</Button>
      </Card.Body>
    </Card>
    </Col>
  );
}

export default App;
