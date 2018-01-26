import * as React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel, FormGroup, FormLabel } from 'material-ui/Form';
import TodoItem from '../../store/todo-item';
import { Filters } from '../../store/actions/filter/set-filter-action';
import ConnectedProps from './connected-props';

const TodoList: React.SFC<ConnectedProps> = props => (
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

const isVisible: (props: ConnectedProps, todo: TodoItem) => boolean = (props, todo) => {
  return props.filter === Filters.Completed ? todo.completed :
    props.filter === Filters.Active ? !todo.completed : true;
};

export default TodoList;
