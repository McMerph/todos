import * as React from 'react';
import { FormEvent } from 'react';
import TodoList from './todo-list';
import FilterChooser from './filter-chooser/index';
import { StyledAddTodoButton, StyledForm, StyledTextField, StyledTodoCard } from './styled';
import Divider from 'material-ui/Divider';
import { CardContent } from 'material-ui/Card';
import ConnectedProps from './connected-props';

// TODO Fix TodoTextField behavior after submit. Controlled component?
export default class Todo extends React.PureComponent<ConnectedProps, {}> {

  private input: HTMLInputElement;

  public constructor(props: ConnectedProps) {
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
