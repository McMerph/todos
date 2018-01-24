import TodoItem from '../../TodoItem';
import AppAction from '../../actions/AppAction';
import AddTodoItemHandler from './AddTodoItemHandler';
import ToggleTodoItemHandler from './ToggleTodoItemHandler';

const initial: TodoItem[] = [
  {
    id: 0,
    text: 'Work',
    completed: true
  },
  {
    id: 1,
    text: 'Learn',
    completed: false
  },
  {
    id: 2,
    text: 'Drink beer',
    completed: false
  }
];

export const todoItemsReducer = (todoItems: TodoItem[] = initial, action: AppAction): TodoItem[] => {
  return new AddTodoItemHandler(new ToggleTodoItemHandler()).handle({todoItems, action});
};
