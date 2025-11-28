import React from 'react';
import {Container} from "react-bootstrap";
import {PageTitle, PageTitleDescription} from "../../components/common/Common.styled";

export const Other: React.FC = () => (
    <Container fluid>
        <PageTitle>Other Page</PageTitle>
        <PageTitleDescription>This will be view with other stuff.</PageTitleDescription>
    </Container>
);
