import styled from 'styled-components';

export const CopyButton = styled.button<{ $backgroundColor: string}>`
    float: right;
    border: none;
    background-color: ${props => props.$backgroundColor};
    margin-top: -5px;
    margin-right: -10px;
    border-radius: 4px;
`;
