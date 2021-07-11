import React from "react";
import classes from "./Header.css";
import { connect } from "react-redux";
import {Navbar,Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"


const Header = (props) => {

  let Navs = (
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
      <Nav className="mr-auto" >
      <Nav.Link href=""><Link to='/'>Home</Link></Nav.Link>
      <Nav.Link href=""><Link to='/login'>SignIn</Link></Nav.Link>
      <Nav.Link href=""><Link to='/Registration' >SignUp</Link></Nav.Link>
      {/* <Nav.Link href=""><Link to='/socket' >socket</Link></Nav.Link> */}
      </Nav>
      </Navbar.Collapse>
  );


  if (props.isAuthenticated && props.ut==="coordinator") {
    Navs = (
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
      <Nav className="mr-auto">
      <Nav.Link href=""><Link to='/StudentsAttendance' >Students attendance </Link></Nav.Link>
      <Nav.Link href=""><Link to='/Attendance' >Attendance</Link></Nav.Link>
      <Nav.Link href=""><Link to='/Courses' >Courses</Link></Nav.Link>
      <Nav.Link href=""><Link to='/' >Profile</Link></Nav.Link>
      <Nav.Link  href=""> <Link to='/logout' >Logout</Link></Nav.Link>
      </Nav>
      </Navbar.Collapse>
    );
    
  }
  else if(props.isAuthenticated && props.ut==="student"){
    Navs = (

      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
      <Nav className="mr-auto">
      <Nav.Link  href=""> <Link to='/logout' >Logout</Link></Nav.Link>
      </Nav>
      </Navbar.Collapse>

    );
    
  }
  else if (props.isAuthenticated && props.ut==="admin") {
    Navs = (

      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
      <Nav className="mr-auto">
      <Nav.Link href=""><Link to='/DashBoard' active>DashBoard</Link></Nav.Link>
      <Nav.Link href=""><Link to='/Students' >Students</Link></Nav.Link>
      <Nav.Link href=""><Link to='/coor' >Coordinators</Link></Nav.Link>
      <Nav.Link href=""><Link to='/coorids' >Add Coordinators</Link></Nav.Link>
      <Nav.Link href=""><Link to='/cards' >Check IDs</Link></Nav.Link>
      <Nav.Link href=""><Link to='/' >Profile</Link></Nav.Link>
      <Nav.Link href="" > <Link to='/logout' >Logout</Link></Nav.Link>
      </Nav>
      </Navbar.Collapse>

    );
  };
  

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top' className={classes.page}>
  <Navbar.Brand> 
  <img src={logo}type="image/png"alt="img" style={{width:'35px',height:'35px',marginRight:'15px',marginLeft:'5px'}}/>
  <div style={{display:'inline-block',top:'5px',position:'relative'}}>Attendance-system
</div>
  </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {Navs}
    </Navbar>

    

  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    ut:state.auth.usertype

  };
};
export default connect(mapStateToProps)(Header);
