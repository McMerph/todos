import TodoItem from '../../../../../../main/app/store/TodoItem';
import { actionProducer } from '../../../../../../main/app/store/actions/ActionsProducer';
import { todoItemsReducer } from '../../../../../../main/app/store/reducers/todo-items/TodoItemsReducer';

test('initial state', () => {
  expect(todoItemsReducer(undefined, {type: 'dummy'}).length).toBeGreaterThan(0);
});

test('\'add todo\' action with empty initial state', () => {
  const todoItemText: string = 'dummy';
  const expected: TodoItem[] = [{
    id: 0,
    text: todoItemText,
    completed: false
  }];
  expect(todoItemsReducer([], actionProducer.addTodo(todoItemText))).toEqual(expected);
});

test('\'add todo\' action with initial state', () => {
  const initialState: TodoItem[] = [{
    id: 0,
    text: 'initial',
    completed: false
  }];
  const todoItemText: string = 'dummy';
  const expected: TodoItem[] = initialState.concat({
    id: 1,
    text: todoItemText,
    completed: false
  });
  expect(todoItemsReducer(initialState, actionProducer.addTodo(todoItemText))).toEqual(expected);
});

test('\'toggle todo\' action', () => {
  const initialState: TodoItem[] = [
    {
      id: 0,
      text: 'initial1',
      completed: false
    },
    {
      id: 1,
      text: 'initial2',
      completed: true
    }];

  expect(todoItemsReducer(initialState, actionProducer.toggleTodo(0))).toEqual([
    {
      id: 0,
      text: 'initial1',
      completed: true
    },
    {
      id: 1,
      text: 'initial2',
      completed: true
    }]);
  expect(todoItemsReducer(initialState, actionProducer.toggleTodo(1))).toEqual([
    {
      id: 0,
      text: 'initial1',
      completed: false
    },
    {
      id: 1,
      text: 'initial2',
      completed: false
    }]);
});
