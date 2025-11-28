import React from "react";
import {Outlet} from "react-router-dom";
import {NavMenu} from "./menu/NavMenu";
import {Header} from "./Header";
import {Col, Container, Row} from "react-bootstrap";
import {ScrollToTopButton} from "./ScrollToTopButton";

export const MainContainer: React.FC = () => (
    <div className="app">
        <Container fluid={true}>
            <NavMenu/>
            <Header/>
            <div className="main-container">
                <Outlet/>
            </div>
            <ScrollToTopButton />
        </Container>
    </div>
);
