import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);

    expect(screen.getByText("Todo List")).toBeInTheDocument();

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write tests for the app")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(input, { target: { value: "New test todo" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New test todo")).toBeInTheDocument();

    expect(input.value).toBe("");
  });

  test("toggles todo completion status", () => {
    render(<TodoList />);

    const todoText = screen.getAllByTestId("todo-text")[0];
    const todoItem = screen.getAllByTestId("todo-item")[0];

    expect(todoItem).not.toHaveClass("completed");

    fireEvent.click(todoText);

    expect(todoItem).toHaveClass("completed");

    fireEvent.click(todoText);

    expect(todoItem).not.toHaveClass("completed");
  });

  test("deletes a todo", () => {
    render(<TodoList />);

    const deleteButtons = screen.getAllByTestId("delete-button");

    const firstTodoText = screen.getAllByTestId("todo-text")[0].textContent;

    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText(firstTodoText)).not.toBeInTheDocument();
  });

  test("shows empty list message when all todos are deleted", () => {
    render(<TodoList />);

    const deleteButtons = screen.getAllByTestId("delete-button");

    deleteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(
      screen.getByText("No todos yet! Add one above.")
    ).toBeInTheDocument();
  });
});
