import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";



export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="py-3 my-4 border-top">
            <Container>
                <Row className="flex-wrap justify-content-between align-items-center ">
                    <Col lg="4">
                        <p className="mb-0 text-muted">{t("copy_right_text")}</p>
                    </Col>
                    <Col lg="4" className="d-flex justify-content-center">
                        <Link to="/">
                            <Navbar.Brand to="/" className={"fw-bold"}>
                                <FontAwesomeIcon icon={"book"} className={"me-2"} />
                                Bookido
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Col lg="4">
                        <Nav className="justify-content-end">
                            <NavLink exact to={"/"} className={"nav-link px-2 text-muted"}>
                                {t('home')}
                            </NavLink>
                            <NavLink to={"/books"} className={"nav-link px-2 text-muted"}>
                                {t('about_page')}
                            </NavLink>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}