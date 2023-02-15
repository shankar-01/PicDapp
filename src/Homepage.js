import {Container, Row} from 'react-bootstrap';
import { MyCard } from './MyCard';
export function Homepage(prop){
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