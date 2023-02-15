import {Card, Button, Col} from 'react-bootstrap';
export function MyCard(prop){
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