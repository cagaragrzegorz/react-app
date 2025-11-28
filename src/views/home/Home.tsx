import React from 'react';
import {Container} from "react-bootstrap";
import {PageTitle, PageTitleDescription} from "../../components/common/Common.styled";
import styled from "styled-components";

export const Home: React.FC = () => (
    <Container fluid>
        <PageTitle>Home Page</PageTitle>
        <PageTitleDescription>This page is meant to contain miscellaneous projects that are part of one website build
            with React and Bootstrap.</PageTitleDescription>
        <StyledP>
            Currently, it includes:
            <ul>
                <li>Todo: A simple todo list application to manage tasks.</li>
                <li>Generators: Tool for generating various content for library.</li>
                <li>Test Status Dashboard: A dashboard for monitoring E2E/API test runs.</li>
            </ul>
            More features and projects will be added in the future.
        </StyledP>
        <StyledP>
            Check out my personal website at <a href="https://cagaragrzegorz.github.io/" target="_blank" rel="noopener noreferrer">https://cagaragrzegorz.github.io/</a>
        </StyledP>
    </Container>
);

export const StyledP = styled.p`
    font-weight: normal;
`