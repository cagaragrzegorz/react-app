import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

export const Home: React.FC = () => (
    <Container fluid>
        <Row>
            <Col>
                <h2>Home Page</h2>
                <p>This page is meant to contain miscellaneous projects/subpages that are part of one website build with React
                    and Bootstrap.
                </p>
                <p>I've build plenty different solutions along my career.
                    Now I want to build portfolio of different use cases for testers and IT projects.
                </p>
            </Col>
        </Row>
    </Container>
);
