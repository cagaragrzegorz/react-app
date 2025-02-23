import React from "react";
import {Outlet} from "react-router-dom";
import {NavMenu} from "./menu/NavMenu";
import {Header} from "./Header";
import {Container} from "react-bootstrap";

export const MainContainer: React.FC = () => (
    <div className="app">
        <Container fluid={true} style={{paddingRight: "0"}}>
            <NavMenu/>
            <Header/>
            <div className="main-container">
                <Outlet/>
            </div>
        </Container>
    </div>
);
