import { actionCreator } from "../../../../src/model/actionCreator";
import ITodoItem from "../../../../src/model/ITodoItem";
import { todoItemsReducer } from "../../../../src/model/reducers/todo-items/todo-items-reducer";

test("initial state", () => {
  expect(todoItemsReducer(undefined, {type: "dummy"}).length).toBeGreaterThan(0);
});

test("'add todo' action with empty initial state", () => {
  const todoItemText: string = "dummy";
  const expected: ITodoItem[] = [{
    completed: false,
    id: 0,
    text: todoItemText,
  }];
  expect(todoItemsReducer([], actionCreator.addTodo(todoItemText))).toEqual(expected);
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
  expect(todoItemsReducer(initialState, actionCreator.addTodo(todoItemText))).toEqual(expected);
});

test("'toggle todo' action", () => {
  const initialState: ITodoItem[] = [
    {
      completed: false,
      id: 0,
      text: "initial1",
    },
    {
      completed: true,
      id: 1,
      text: "initial2",
    }];

  expect(todoItemsReducer(initialState, actionCreator.toggleTodo(0))).toEqual([
    {
      completed: true,
      id: 0,
      text: "initial1",
    },
    {
      completed: true,
      id: 1,
      text: "initial2",
    }]);
  expect(todoItemsReducer(initialState, actionCreator.toggleTodo(1))).toEqual([
    {
      completed: false,
      id: 0,
      text: "initial1",
    },
    {
      completed: false,
      id: 1,
      text: "initial2",
    }]);
});
