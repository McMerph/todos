import actionCreator from "../actionCreator";
import ITodoItem from "../ITodoItem";
import { todoItems } from "./todoItems";

test("'add todo' action with empty initial state", () => {
  const todoItemText: string = "dummy";
  const expected: ITodoItem[] = [{
    completed: false,
    id: 0,
    text: todoItemText,
  }];
  expect(todoItems([], actionCreator.addTodo(todoItemText))).toEqual(expected);
});

test("'add todo' action with initial state", () => {
  const initialState: ITodoItem[] = [{
    completed: false,
    id: 0,
    text: "initial",
  }];
  const todoItemText: string = "dummy";
  const expected: ITodoItem[] = initialState.concat({
    completed: false,
    id: 1,
    text: todoItemText,
  });
  expect(todoItems(initialState, actionCreator.addTodo(todoItemText))).toEqual(expected);
});

test("'toggle todo' action", () => {
  const initialState: ITodoItem[] = [
    {
      completed: false,
      text: "initial1",
    },
    {
      completed: true,
      text: "initial2",
    }];

  expect(todoItems(initialState, actionCreator.toggleTodo(0))).toEqual([
    {
      completed: true,
      text: "initial1",
    },
    {
      completed: true,
      text: "initial2",
    }]);
  expect(todoItems(initialState, actionCreator.toggleTodo(1))).toEqual([
    {
      completed: false,
      text: "initial1",
    },
    {
      completed: false,
      text: "initial2",
    }]);
});
