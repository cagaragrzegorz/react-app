import styled from "styled-components";

export const TodoContainer = styled.div`
    padding: 10px;
    width: 600px;
    margin: 20px auto auto;
    box-shadow: 5px 7px 16px 0 #8b8b8b;
    border-radius: 8px;
    @media (max-width: 768px) {
        width: 80%;
    }
`
export const TaskInputContainer = styled.div`
    padding: 10px;
    width: 100%;
    border-bottom: solid 1px #e5e5e5;
    display: flex;
    margin-bottom: 20px;
    background-color: white;
`
export const TaskContainer = styled.div`
    padding: 10px;
    width: 100%;
    border-bottom: solid 1px #e5e5e5;
    display: flex;
    margin-bottom: 4px;
    background-color: white;
`
export const TaskListContainer = styled.div`
    margin-top: 16px;
`
export const TaskInput = styled.input`
    padding: 10px;
    margin-right: 10px;
    width: 90%;
    border: none;
    border-bottom: solid 1px #999999;
`
export const TaskSpan = styled.span<{ isCompleted?: boolean; }>`
    text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
    padding: 2px;
`
export const ActionButton = styled.button`
    border: none;
    background-color: white;
    margin-left: auto;
`
export const TextButton = styled.button<{ isActive?: boolean;}>`
    text-decoration: underline;
    border: none;
    background-color: white;
    font-weight: ${props => props.isActive ? 600 : 400};
    color: ${props => props.isActive ? '#3a7bfd' : '#000000'};
    &:hover {
        color: #3a7bfd;
    }
`
export const TodoFooter = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    @media(max-width: 768px) {
        display: flow;
    }
`