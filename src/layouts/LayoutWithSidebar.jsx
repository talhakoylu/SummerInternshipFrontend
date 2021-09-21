import React from 'react';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import BookLevels from './../components/sidebar/BookLevels';
import BookLanguages from '../components/sidebar/BookLanguages';

const LayoutWidthSidebar = ({ children, ...rest }) => {
    return (
        <Container>
            <Row>
                <Col lg={9}>{children}</Col>
                <Col lg={3}>
                    <BookLevels />
                    <div className="mt-3">
                        <BookLanguages />
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

const LayoutWidthSidebarRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutWidthSidebar>
                <Component {...matchProps} />
            </LayoutWidthSidebar>
        )} />
    )
};

export default LayoutWidthSidebarRoute;