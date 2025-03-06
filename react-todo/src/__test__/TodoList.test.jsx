import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";
import { expect } from "vitest";

test("Make sure if TodoList renders correctly", () => {
  render(<TodoList />);

  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent("Todo List");

  expect(screen.getByText("2 items left")).toBeInTheDocument();
  expect(screen.queryByRole("textbox")).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /add todo/i })
  ).toBeInTheDocument();
});

test("Make sure that length of todo list is three", () => {
  render(<TodoList />);

  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("verify that a new todo can be added", () => {
  render(<TodoList />);

  expect(screen.getAllByRole("listitem")).toHaveLength(3);
  const input = screen.getByRole("textbox");
  expect(input).toHaveValue("");

  fireEvent.change(input, { target: { value: "Go to the market" } });
  expect(input).toHaveValue("Go to the market");

  fireEvent.submit(screen.queryByRole("form"));
  expect(input).toHaveValue("");
  expect(screen.getByText("3 items left")).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(4);
});

test("verify that a todo item can be toggled between completed and not completed", () => {
  render(<TodoList />);

  const todoTextElement = screen.getByText("Learn React");
  const todoTextLi = todoTextElement.closest("li");

  expect(screen.getByText("2 items left")).toBeInTheDocument();
  expect(todoTextLi).not.toHaveClass("line-through");

  fireEvent.click(todoTextElement);

  expect(screen.getByText("1 items left")).toBeInTheDocument();
  expect(todoTextLi).toHaveClass("line-through");

  fireEvent.click(todoTextElement);

  expect(screen.getByText("2 items left")).toBeInTheDocument();
  expect(todoTextLi).not.toHaveClass("line-through");
});

test("verify that a todo item can be deleted", async () => {
  render(<TodoList />);

  expect(screen.getAllByRole("listitem")).toHaveLength(3);

  let deleteButtons = screen.getAllByRole("button", { name: "" });

  expect(deleteButtons).toHaveLength(3);

  fireEvent.click(deleteButtons[2]);

  await waitFor(() => {
    deleteButtons = screen.getAllByRole("button", { name: "" });
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  fireEvent.click(deleteButtons[1]);

  await waitFor(() => {
    deleteButtons = screen.getAllByRole("button", { name: "" });
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(deleteButtons).toHaveLength(1);
  });

  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
