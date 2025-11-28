import styled from 'styled-components';

export const GeneratorsWrapper = styled.div`
    margin-top: -20px;
`;

export const StyledH2 = styled.h2`
    margin-top: 5px;
    font-weight: 500;
    line-height: 120%;
    padding-bottom: 10px;
`;
export const StyledH3 = styled.h3`
    margin-top: 5px;
    font-weight: 500;
`;
export const StyledH4 = styled.h4`
    margin-top: 10px;
    font-weight: 500;
`;
export const RequiredSpan = styled.span`
    color: #b53240;
    &::after {
        content: '*';
    }
`;
export const LinkSpan = styled.span`
    float: right;
    margin-right: 10px;
    text-decoration: underline;
    color: #000000;
    cursor: pointer;
    &:hover {
        text-decoration: none;
    }
`;
export const BlueInfoSpan = styled.span`
    margin-right: 10px;
    color: #297ba3;
    background-color: #f0fafc;
    padding: 8px;
    font-size: 0.8rem;
    border-radius: 8px;
    font-style: italic;
`;
export const ContextInput = styled.input`
    height: 2.5rem;
    width: 300px;
`;
export const ContextSelect = styled.select`
    height: 2.5rem;
    width: 300px;
`;
export const ContextLabel = styled.label`
    width: 310px;
    color: #444444;
`;
export const CategoryButton = styled.button<{ $backgroundColor: string}>`
    border: 2px solid #297ba3;
    background-color: ${props => props.$backgroundColor};
    margin: 8px 8px 8px 0;
    padding: 4px 16px;
    border-radius: 4px;
    width: 150px;
    
    &:hover {
        background-color: #daeaee;
    }
`;

export const ShareableLinkPreview = styled.pre`
    background-color: #f6f6f6;
    border: 2px solid #ccc;
    padding: 10px;
    color: #000000;
    text-decoration: underline;
    text-wrap: normal;
`;