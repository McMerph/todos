import * as React from 'react';
import { FormEvent } from 'react';
import TodoItem from '../store/TodoItem';
import TodoList from './TodoList';
import FilterChooser from './FilterChooser';
import { Filters } from '../store/actions/filter/SetFilterAction';
import { Card } from './Card';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import TextField, { TextFieldProps } from 'material-ui/TextField';
import { ButtonProps } from 'material-ui/es/Button';

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

interface AppProps extends StateFromProps, DispatchFromProps {
}

const AppCard = Card.extend`
  width: 98%;
  max-width: 500px;
  margin: 15px auto;
`;

const offset: number = 12;

const StyledForm = styled.form`
  display: flex;
`;

interface ClassNameProps {
  className?: string;
}

const TodoTextField: React.SFC<ClassNameProps & TextFieldProps> = props =>
  <TextField className={props.className} {...props}/>;

const StyledTextField = styled(TodoTextField)`
  flex: auto;
`;

const AddTodoButton: React.SFC<ClassNameProps & ButtonProps> = props =>
  <Button className={props.className} {...props}/>;

const StyledAddTodoButton = styled(AddTodoButton)`
  flex: 0 1 100px;
  margin-left: ${offset}px !important;
`;

export default class App extends React.PureComponent<AppProps, {}> {

  private input: HTMLInputElement;

  public constructor(props: AppProps) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <AppCard>
        <StyledForm onSubmit={this.onSubmit}>
          <StyledTextField label="Todo" inputRef={(input: HTMLInputElement) => this.input = input}/>
          <StyledAddTodoButton raised={true} color="primary" type="submit">Add</StyledAddTodoButton>
        </StyledForm>
        <TodoList {...this.props}/>
        <FilterChooser {...this.props}/>
      </AppCard>
    );
  }

  private onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.input.value.length > 0) {
      const value: string = this.input.value;
      this.input.value = '';
      this.props.actions.onAdd(value);
    }
  }

}
