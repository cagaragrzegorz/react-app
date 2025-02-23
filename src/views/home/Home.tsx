import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

export const Home: React.FC = () => (
    <Container fluid>
        <Row>
            <Col>
                <h2>Home Page</h2>
                <p>This page is meant to contain miscellaneous projects that are part of one website build with React
                    and Bootstrap.
                </p>
            </Col>
        </Row>
    </Container>
);
