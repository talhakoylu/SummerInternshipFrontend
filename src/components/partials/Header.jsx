import { Navbar, Container } from 'react-bootstrap'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Categories from '../Nav/CategoryMenu'
import { Link } from 'react-router-dom'
import NavMenu from './../Nav/NavMenu';
import AccountArea from '../Nav/AccountArea'
import LanguageDropdown from '../Nav/LanguageDropdown'

/**
 * A function that using for show the header area. Also this function including logo area, account area, page and category menus.
 * @returns HTML output
 */

export default function Header() {
    return (
        <div className="mb-4">
            <Navbar bg="light" expand="lg">
                <Container className="py-3">
                    <Link to="/">
                        <Navbar.Brand to="/" className={"fw-bold"}>
                            <FontAwesomeIcon icon={"book"} className={"me-2"} />
                            Bookido
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <NavMenu />
                        <div className="d-flex">
                            <AccountArea></AccountArea>
                            <div className="ms-2">
                                <LanguageDropdown></LanguageDropdown>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Categories></Categories>
        </div>
    )
}