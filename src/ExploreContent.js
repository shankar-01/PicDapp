import {Button} from 'react-bootstrap';
export function ExploreContent(prop){
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