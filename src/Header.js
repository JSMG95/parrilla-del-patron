import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
    <header>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#home">Parrilla del Patrón</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav activeKey={1} pullRight>

                <LinkContainer exact to="/"><NavItem eventKey={1}>Home </NavItem></LinkContainer>
                <LinkContainer to="/admin"><NavItem eventKey={2}>Admin </NavItem></LinkContainer>

            </Nav>
        </Navbar>
    </header>

);

export default Header;