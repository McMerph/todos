import TodoItem from '../../todo-item';
import AppAction from '../../actions/app-action';
import AddTodoItemHandler from './add-todo-item-handler';
import ToggleTodoItemHandler from './toggle-todo-item-handler';

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
