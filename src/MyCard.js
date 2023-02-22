import {Card, Button, Col} from 'react-bootstrap';
export function MyCard(prop){
    let obj = prop.obj;
    return (
      <Col md="4">
      <Card style={{ width: '18rem' }}>
        {console.log("content card : ", obj.content)};
        <Card.Img variant="top" src={`http://localhost:4000/uploads/${obj.content}`} />
        <Card.Body>
          <Card.Title>{obj.title}</Card.Title>
          <Card.Text>Price : {obj.price}</Card.Text>
          <Card.Text>Owner : {obj.owner}</Card.Text>
          <Card.Text>
            {obj.description}
          </Card.Text>
          <Button variant="primary">{obj.isLicensor?"Preview":"Buy"}</Button>
        </Card.Body>
      </Card>
      </Col>
    );
  }