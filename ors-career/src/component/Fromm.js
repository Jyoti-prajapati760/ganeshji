import React, { Component } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
export default class Fromm extends Component  {

constructor() {
  super()
  this.state = {
    "firstName": "",
    "lastName": "",
    "loginId": "",
    "password": "",
    "roleId": "",
  }
  this.pid = window.location.pathname.split("/")[2]
  // console.log("Pid :",this.pid)
  if (this.pid) {
    this.getOne(this.pid)
  }
}

getOne(id) {
  console.log("id in get method ", id)
  fetch("https://manraj-ors-1.onrender.com/user/" + id).then((res) => res.json()).then((result) => {
    console.log("Get a user data : ", result);
    // this.setState(result)
    this.setState({
      "firstName": result.firstName,
      "lastName": result.lastName,
      "loginId": result.loginId,
      "password": result.password,
      "roleId": result.roleId
    })

  })
}

handleSubmit() {
  // console.log("This is sbmit function", this.state);
  if (this.pid) {
    console.log("PUT")
    fetch('https://manraj-ors-1.onrender.com/user/' + this.pid, {
      method: 'PUT',
      body: JSON.stringify(this.state),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  } else {
    console.log("Post")

    fetch('https://manraj-ors-1.onrender.com/user', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  }
}
render(){
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your First Name' size='lg' placeholder='' value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} id='firstName' type='text'/>

          <MDBInput wrapperClass='mb-4' label='Your Last Name' size='lg' placeholder='' id='lastName' type='text' value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })}/>

          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='loginId' type='email' value={this.state.loginId} onChange={(e) => this.setState({ loginId: e.target.value })}/>
        

          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='password' type='password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}/>
          

          <MDBInput wrapperClass='mb-4' label='role ID' size='lg' id='form4' type='text' value={this.state.roleId} onChange={(e) => this.setState({ roleId: e.target.value })}/>
        

          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={() => this.handleSubmit()}>Register</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
}
