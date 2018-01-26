import * as React from 'react';
import TodoItem from '../store/todo-item';
import { Filters } from '../store/actions/filter/set-filter-action';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel, FormGroup, FormLabel } from 'material-ui/Form';

interface Props {

  filter: Filters;
  todoItems: TodoItem[];
  actions: {
    onToggle: (id: number) => void;
  };

}

export default class TodoList extends React.PureComponent<Props, {}> {

  public render(): React.ReactNode {
    return (
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Todo's list:</FormLabel>
        <FormGroup>
          {this.props.todoItems.filter((todo) => this.isVisible(todo)).map((todo) =>
            <FormControlLabel
              key={todo.id}
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={() => this.props.actions.onToggle(todo.id)}
                  value={todo.text}
                />
              }
              label={todo.text}
            />
          )}
        </FormGroup>
      </FormControl>
    );
  }

  private isVisible(todo: TodoItem): boolean {
    if (this.props.filter === Filters.All) {
      return true;
    } else if (this.props.filter === Filters.Completed) {
      return todo.completed;
    } else if (this.props.filter === Filters.Active) {
      return !todo.completed;
    } else {
      return true;
    }
  }

}
