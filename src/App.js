import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Card, Col, Button} from 'react-bootstrap';  
import img1 from "./pdapp.png"
function App() {
  let list = [
    {title:"Me", text:"Flower is beautiful.", image:'https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg'}
  ];
  return (
    <div className="App">  
    <Navbar />
    {list.map((a)=><MyCard obj={a}/>)}
    </div>  
  );
}
function Navbar(prop){
  return (
  <div class="navbar" style={{background:"purple"}}>
  <img src={img1} style={{width:"3%"}}/>
  </div>);
}
function MyCard(prop){
  let obj = prop.obj;
  return (
    <Container className='p-4'>  
  <Col md="4">  
  <Card>  
  <Card.Img variant="top" src={obj.image} />  
  <Card.Body>  
    <Card.Title>{obj.title}</Card.Title>  
    <Card.Text>  
    {obj.text}
    </Card.Text>  
    <Button variant="primary">Buy License</Button>  
  </Card.Body>  
</Card>  
    </Col>  
</Container> 
  );
}

export default App;
