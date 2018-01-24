import * as React from 'react';
import TodoItem from '../store/TodoItem';
import { Filters } from '../store/actions/filter/SetFilterAction';
import Checkbox from './checkbox/index';
import styled from 'styled-components';

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
            <Checkbox
              text={todo.text}
              onClick={() => this.props.actions.onToggle(todo.id)}
              defaultChecked={todo.completed}
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
