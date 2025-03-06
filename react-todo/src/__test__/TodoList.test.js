import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders TodoList component correctly", () => {
    render(<TodoList />);

    const heading = screen.getByRole("heading", { name: /todo list/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();

    expect(screen.getByText("2 items left")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter a new todo")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add todo/i })
    ).toBeInTheDocument();
  });

  test("allows adding a new todo", () => {
    render(<TodoList />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    const input = screen.getByPlaceholderText("Enter a new todo");
    const addButton = screen.getByRole("button", { name: /add todo/i });

    fireEvent.change(input, { target: { value: "Go shopping" } });
    fireEvent.click(addButton);

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("Go shopping")).toBeInTheDocument();
    expect(screen.getByText("3 items left")).toBeInTheDocument();

    expect(input).toHaveValue("");
  });

  test("allows toggling todo completion status", () => {
    render(<TodoList />);

    const todo = screen.getByText("Learn React");
    const todoItem = todo.closest("li");

    expect(todoItem).not.toHaveClass("line-through");
    expect(screen.getByText("2 items left")).toBeInTheDocument();

    fireEvent.click(todo);

    expect(todoItem).toHaveClass("line-through");
    expect(todoItem).toHaveClass("bg-green-50");
    expect(screen.getByText("1 items left")).toBeInTheDocument();

    fireEvent.click(todo);

    expect(todoItem).not.toHaveClass("line-through");
    expect(screen.getByText("2 items left")).toBeInTheDocument();
  });

  test("allows deleting todos", async () => {
    render(<TodoList />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    const deleteButtons = screen.getAllByRole("button", { name: "" });

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    const remainingDeleteButtons = screen.getAllByRole("button", { name: "" });
    fireEvent.click(remainingDeleteButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });
  });
});
