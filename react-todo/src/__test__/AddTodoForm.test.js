import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTodoForm from "../AddTodoForm";

describe("AddTodoForm Component", () => {
  test("renders form elements", () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm addTodo={mockAddTodo} />);

    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Add a new todo...")
    ).toBeInTheDocument();
  });

  test("calls addTodo when form is submitted with valid input", () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm addTodo={mockAddTodo} />);

    const input = screen.getByTestId("todo-input");
    const form = screen.getByTestId("add-todo-form");

    fireEvent.change(input, { target: { value: "Test todo" } });
    fireEvent.submit(form);

    expect(mockAddTodo).toHaveBeenCalledWith("Test todo");
    expect(mockAddTodo).toHaveBeenCalledTimes(1);

    expect(input.value).toBe("");
  });

  test("does not call addTodo when form is submitted with empty input", () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm addTodo={mockAddTodo} />);

    const form = screen.getByTestId("add-todo-form");

    fireEvent.submit(form);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  test("does not call addTodo when form is submitted with only whitespace", () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm addTodo={mockAddTodo} />);

    const input = screen.getByTestId("todo-input");
    const form = screen.getByTestId("add-todo-form");

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.submit(form);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
