import React, { useState } from "react";
import "./AddTodoForm.css";

const AddTodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="add-todo-form"
      data-testid="add-todo-form"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
        data-testid="todo-input"
      />
      <button type="submit" className="add-button" data-testid="add-button">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
