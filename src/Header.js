import React from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => (
    <Navbar bg="light" expand="lg">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand>Murushop</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">

                <LinkContainer to="/library">
                    <Nav.Link href="/library">Library</Nav.Link>
                </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)

export default Header
