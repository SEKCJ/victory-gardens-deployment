import React, { } from 'react';
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IAppProps } from '../App';
import { RouteComponentProps, withRouter } from 'react-router';

interface INavbar extends RouteComponentProps { };

const Navigate: React.FC<INavbar> = (props) => {
    let handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        props.history.push('/')
        await localStorage.clear()
        window.location.reload()
    }


    return (
        <Navbar variant="dark" bg="dark" expand="md" sticky="top" collapseOnSelect>
            <Navbar.Brand href="/"> <Image src={window.location.origin + "/assets/VGLogo.png"}
                style={{ "width": "3em" }} rounded /></Navbar.Brand>
            <Navbar.Toggle aria-controls="user-navbar" />
            <Navbar.Collapse id="user-navbar">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/choose">Help Me Choose</Nav.Link>
                    <NavDropdown title="Browse All" id="browse-dropdown">
                        <NavDropdown.Item as={Link} to='/veggies'>Veggies</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/userherbs'>Herbs</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/savedveggies">My Garden</Nav.Link>
                    <Nav.Link as={Link} to="/communitygarden">Community Garden</Nav.Link>
                </Nav>
                <Nav >
                    <NavDropdown alignRight title="My Profile" id="profile-dropdown">
                        <NavDropdown.Item as={Link} to="/myprofile" className="text-muted">My Profile</NavDropdown.Item>
                        <NavDropdown.Item className="text-danger" onClick={(e: React.MouseEvent) => handleClick(e)}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}



export default withRouter(Navigate);