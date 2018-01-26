import * as React from 'react';
import TodoItem from '../store/TodoItem';
import { Filters } from '../store/actions/filter/SetFilterAction';
import Checkbox from 'material-ui/Checkbox';
import styled from 'styled-components';
import { FormControlLabel } from 'material-ui/Form';

const StyledUl = styled.ul`
  list-style: none;
  padding-left: 20px;
`;

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
      <StyledUl>
        {this.props.todoItems.filter((todo) => this.isVisible(todo)).map((todo) =>
          <li key={todo.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={() => this.props.actions.onToggle(todo.id)}
                  value={todo.text}
                />
              }
              label={todo.text}
            />
          </li>
        )}
      </StyledUl>
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
