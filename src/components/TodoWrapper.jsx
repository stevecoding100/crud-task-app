import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

// This creates a id for eact task added, in order to keep track
import { v4 as uuidv4 } from "uuid";
uuidv4();

const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    // Add Task to the list
    const addTodo = (todo) => {
        setTodos([
            ...todos,
            { id: uuidv4(), task: todo, completed: false, isEditing: false },
        ]);
    };
    // Marking as complete
    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };
    // Deleting Task
    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

    // Editting Task
    const editTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };
    // Editting and Updating text
    const editTask = (task, id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, task, isEditing: !todo.isEditing }
                    : todo
            )
        );
    };
    return (
        <div className="TodoWrapper">
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            {/* Mapping through the todos array, with the user input  */}
            {todos.map((todo) =>
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} />
                ) : (
                    <Todo
                        key={todo.id}
                        task={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            )}
        </div>
    );
};

export default TodoWrapper;
