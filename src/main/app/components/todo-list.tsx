import * as React from 'react';
import TodoItem from '../store/todo-item';
import { Filters } from '../store/actions/filter/set-filter-action';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel, FormGroup, FormLabel } from 'material-ui/Form';

interface Props {
  filter: Filters;
  todoItems: TodoItem[];
  actions: { onToggle: (id: number) => void; };
}

const TodoList: React.SFC<Props> = props => (
  <FormControl component="fieldset" fullWidth>
    <FormLabel component="legend">Todo's list:</FormLabel>
    <FormGroup>
      {props.todoItems.filter((todo) => isVisible(props, todo)).map((todo) =>
        <FormControlLabel
          key={todo.id}
          control={<Checkbox checked={todo.completed} onChange={() => props.actions.onToggle(todo.id)}/>}
          label={todo.text}
        />
      )}
    </FormGroup>
  </FormControl>
);

const isVisible: (props: Props, todo: TodoItem) => boolean = (props, todo) => {
  return props.filter === Filters.Completed ? todo.completed :
    props.filter === Filters.Active ? !todo.completed : true;
};

export default TodoList;
