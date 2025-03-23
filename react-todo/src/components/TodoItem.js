import React from "react";
import "./TodoItem.css";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""}`}
      data-testid="todo-item"
    >
      <div
        className="todo-text"
        onClick={() => toggleTodo(todo.id)}
        data-testid="todo-text"
      >
        {todo.text}
      </div>
      <button
        className="delete-button"
        onClick={() => deleteTodo(todo.id)}
        data-testid="delete-button"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
