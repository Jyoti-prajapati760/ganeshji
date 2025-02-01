import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


export default class Dashboard extends Component {

  logout(){
    console.log("logout")
    localStorage.clear();
    window.location.pathname="/Login";
  }
  render() {
    let auth = localStorage.getItem("token")
    auth = JSON.parse(auth)
    console.log(auth);
    
    return (
      <Navbar expand="lg" className='nav' >
        <Container>
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            {!auth ? <Nav className="me-auto">
              <Link className='nav-link' to="/Login">Login</Link>
              <Link className='nav-link' to="/Registration">Registration</Link>
            </ Nav >
              :

              <Nav className="me-auto">
                <Link className='nav-link' to="/">Home</Link>

                {/* user  */}
                <NavDropdown title="User" id="basic-nav-dropdown">
                  <Link className='nav-link' to="/AddUser">Add User</Link>
                  <Link className='nav-link' to="/UserList">User List</Link>
                </NavDropdown>
                {/* collage */}
                <NavDropdown title="Collage" id="basic-nav-dropdown">
                  <Link className='nav-link' to="/AddCollage">Add Collage</Link>
                  <Link className='nav-link' to="/CollageList">collage List</Link>
                </NavDropdown>

                {/* student */}
                <NavDropdown title="Student" id="basic-nav-dropdown">
                  <Link className='nav-link' to="/AddStudent">Add Student</Link>
                  <Link className='nav-link' to="/StudentList">Student List</Link>
                </NavDropdown>


                {/* marksheet*/}
                <NavDropdown title="Marksheet" id="basic-nav-dropdown">
                  <Link className='nav-link' to="/AddMarksheet">Add Marksheet</Link>
                  <Link className='nav-link' to="/MarksheetList">Marksheet List</Link>
                </NavDropdown>


                {/* role */}
                <NavDropdown title="role" id="basic-nav-dropdown">
                  <Link className='nav-link' to="/AddRole">Add Role</Link>
                  <Link className='nav-link' to="/RoleList">Role List</Link>
                </NavDropdown>
                <span className='nav-link' style={{cursor:"pointer"}} onClick={()=>this.logout()}>logout</span>

              </Nav>
            }
            {/* <Link className='nav-link' to="/Fromm">Fromm</Link> */}
            {/* <Link className='nav-link' to="/Work">Work</Link>
<Link className='nav-link' to="/From">From</Link>
<Link className='nav-link' to="/List">List</Link> 
<Link className='nav-link' to="/Ragistration">Ragistration</Link> */}




          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}



