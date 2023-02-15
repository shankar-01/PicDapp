import { MDBCol } from "mdbreact"
export function SearchBar(prop){

    return (
    <MDBCol md="6">
    <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
  </MDBCol>);
  }