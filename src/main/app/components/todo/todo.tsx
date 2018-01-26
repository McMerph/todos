import * as React from 'react';
import { FormEvent } from 'react';
import TodoItem from '../../store/todo-item';
import TodoList from './todo-list';
import FilterChooser from './filter-chooser/index';
import { Filters } from '../../store/actions/filter/set-filter-action';
import { StyledAddTodoButton, StyledForm, StyledTextField, StyledTodoCard } from './styled';
import Divider from 'material-ui/Divider';
import { CardContent } from 'material-ui/Card';

export interface StateFromProps {
  filter: Filters;
  todoItems: TodoItem[];
}

export interface DispatchFromProps {
  actions: {
    onToggle: (id: number) => void;
    onAdd: (text: string) => void;
    onSetFilter: (filter: Filters) => void;
  };
}

// TODO Fix TodoTextField behavior after submit. Controlled component?
export default class Todo extends React.PureComponent<StateFromProps & DispatchFromProps, {}> {

  private input: HTMLInputElement;

  public constructor(props: StateFromProps & DispatchFromProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <StyledTodoCard>
        <CardContent>
          <StyledForm onSubmit={this.onSubmit}>
            <StyledTextField label="Todo" inputRef={(input: HTMLInputElement) => this.input = input}/>
            <StyledAddTodoButton raised={true} color="primary" type="submit">Add</StyledAddTodoButton>
          </StyledForm>
          <TodoList {...this.props}/>
          <Divider/>
          <FilterChooser {...this.props}/>
        </CardContent>
      </StyledTodoCard>
    );
  }

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.input.value.length > 0) {
      const value: string = this.input.value;
      this.input.value = '';
      this.props.actions.onAdd(value);
    }
  }

}
