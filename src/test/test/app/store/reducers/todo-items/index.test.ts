import { actionProducer } from "../../../../../../main/app/store/actions/IActionProducer";
import { todoItemsReducer } from "../../../../../../main/app/store/reducers/todo-items/todo-items-reducer";
import TodoItem from "../../../../../../main/app/store/todo-item";

test("initial state", () => {
  expect(todoItemsReducer(undefined, {type: "dummy"}).length).toBeGreaterThan(0);
});

test("'add todo' action with empty initial state", () => {
  const todoItemText: string = "dummy";
  const expected: TodoItem[] = [{
    completed: false,
    id: 0,
    text: todoItemText,
  }];
  expect(todoItemsReducer([], actionProducer.addTodo(todoItemText))).toEqual(expected);
});

test("'add todo' action with initial state", () => {
  const initialState: TodoItem[] = [{
    completed: false,
    id: 0,
    text: "initial",
  }];
  const todoItemText: string = "dummy";
  const expected: TodoItem[] = initialState.concat({
    completed: false,
    id: 1,
    text: todoItemText,
  });
  expect(todoItemsReducer(initialState, actionProducer.addTodo(todoItemText))).toEqual(expected);
});

test("'toggle todo' action", () => {
  const initialState: TodoItem[] = [
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

  expect(todoItemsReducer(initialState, actionProducer.toggleTodo(0))).toEqual([
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
  expect(todoItemsReducer(initialState, actionProducer.toggleTodo(1))).toEqual([
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
