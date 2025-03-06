import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoItem from "../TodoItem";

describe("TodoItem Component", () => {
  const mockTodo = {
    id: 1,
    text: "Test Todo",
    completed: false,
  };

  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    mockToggleTodo.mockReset();
    mockDeleteTodo.mockReset();
  });

  test("renders todo item correctly", () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("applies completed class when todo is completed", () => {
    const completedTodo = { ...mockTodo, completed: true };

    render(
      <TodoItem
        todo={completedTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    expect(screen.getByTestId("todo-item")).toHaveClass("completed");
  });

  test("calls toggleTodo when todo text is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    fireEvent.click(screen.getByText("Test Todo"));

    expect(mockToggleTodo).toHaveBeenCalledWith(mockTodo.id);
    expect(mockToggleTodo).toHaveBeenCalledTimes(1);
  });

  test("calls deleteTodo when delete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
  });
});
