import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container, Card, Button, Col, Row} from 'react-bootstrap';
import { MDBCol } from "mdbreact"
import logoImg from "./pdapp.png"
import profileImg from "./profileIcon.png"
import addImg from "./addImageIcon.png"
function App() {
  let list = [
    {title:"Me", text:"Flower is beautiful.", image:'https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg'},
    {title:"Me", text:"Flower is beautiful.", image:'https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg'}
  ];
  return (
    <div className="App">  
    <Navbar />
    <Container className='p-4'>
    <Row>
    {list.map((a)=><MyCard obj={a} style={{display:"inline-block"}}/>)}
    </Row>
    </Container>
    </div>  
  );
}
function Navbar(prop){
  return (
  <div class="navbar" style={{background:"purple", display: "flex", alignSelf: "center"}}>
  <div style={{display: "flex",justifyContent: "start",  width:"70%"}}>
  <img src={logoImg} style={{width:"3%", marginRight:"10%"}}/>
  <SearchBar />
  </div>
  <div style={{display: "flex",justifyContent: "end", width:"30%"}}>
  <button style={{width:"12%", background:"transparent", border:"none"}}><img src={profileImg} style={{width:"100%"}}/></button>
  <button style={{width:"12%", background:"transparent", border:"none"}}><img src={addImg} style={{width:"100%"}}/></button>
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
