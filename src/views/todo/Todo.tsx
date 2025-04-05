import React, {useEffect, useState} from 'react';
import {
    ActionButton,
    TaskInput,
    TaskContainer,
    TodoContainer,
    TaskSpan,
    TaskListContainer,
    TextButton, TodoFooter, TaskInputContainer
} from "./Todo.styled";
import {Plus, X} from "lucide-react";
import './Todo.css'

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}
export const Todo: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todosToDisplay, setTodosToDisplay] = useState<Todo[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [inputValue, setInputValue] = useState<string>('');
    const [activeTodosCount, setActiveTodosCount] = useState<number>(0);

    useEffect(() => {
        setActiveTodosCount(todos.filter(todo => !todo.completed).length)
        setTodosToDisplay(todos)
        setActiveFilter('all')
    }, [todos]);

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo: Todo = {
                id: Date.now(),
                text: inputValue,
                completed: false,
            };
            setTodos((prevTodos) => {return [...prevTodos, newTodo]});
            setInputValue('');
        }
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            addTodo()
        }
    };
    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const deleteCompletedTodos = () =>{
        setTodos(todos.filter(todo => !todo.completed));
    }

    const filterTasks = (filter: 'all'|'active'|'completed') => {
        switch (filter) {
            case "all": setTodosToDisplay(todos)
                break;
            case "active": setTodosToDisplay(todos.filter(todo => !todo.completed))
                break;
            case "completed": setTodosToDisplay(todos.filter(todo => todo.completed))
                break;
        }
        setActiveFilter(filter)
    };

    return (
        <div>
            <h1>Todo App</h1>
            <p>This is TODO app for testing purposes. I created e2e tests using different Frameworks utilizing this app.</p>
            <TodoContainer data-testid="todo-container">
                <TaskInputContainer data-testid="task-input-container">
                    <TaskInput
                        data-testid="task-input"
                        type="text"
                        value={inputValue}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add a new todo"
                    />
                    <ActionButton data-testid="add-task" onClick={addTodo}><Plus/></ActionButton>
                </TaskInputContainer>
                <TaskListContainer data-testid="task-list-container">
                    {todosToDisplay.map(todo => (
                        <TaskContainer data-testid="task-container" key={todo.id}
                                       className={todo.completed ? 'completed' : ''}>
                            <div className="check-circle">
                                <input data-testid="task-checkbox" type="checkbox" checked={todo.completed}
                                       onChange={() => toggleTodo(todo.id)}/>
                                <label data-testid="task-checkbox-label" htmlFor="checkbox"
                                       onClick={() => toggleTodo(todo.id)}></label>
                            </div>
                            <TaskSpan isCompleted={todo.completed}>{todo.text}</TaskSpan>
                            <ActionButton data-testid="delete-task"
                                          onClick={() => deleteTodo(todo.id)}><X/></ActionButton>
                        </TaskContainer>
                    ))}
                    <TodoFooter data-testid="footer">
                        <span
                            data-testid="task-count">{activeTodosCount} {activeTodosCount <= 1 ? 'task' : 'tasks'} left</span><span></span>
                        <TextButton data-testid="all-filter" type="button" isActive={activeFilter === 'all'}
                                    onClick={() => filterTasks('all')}>All</TextButton>
                        <TextButton data-testid="active-filter" type="button" isActive={activeFilter === 'active'}
                                    onClick={() => filterTasks('active')}>Active</TextButton>
                        <TextButton data-testid="completed-filter" type="button" isActive={activeFilter === 'completed'}
                                    onClick={() => filterTasks('completed')}>Completed</TextButton>
                        <TextButton data-testid="clear-completed" type="button" onClick={deleteCompletedTodos}>Clear
                            Completed</TextButton>
                    </TodoFooter>
                </TaskListContainer>
            </TodoContainer>
        </div>
    );
};