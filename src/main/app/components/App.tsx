import * as React from 'react';
import { FormEvent } from 'react';
import TodoItem from '../store/TodoItem';
import TodoList from './TodoList';
import FilterChooser from './FilterChooser';
import { Filters } from '../store/actions/filter/SetFilterAction';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import TextField, { TextFieldProps } from 'material-ui/TextField';
import { ButtonProps } from 'material-ui/es/Button';
import Divider from 'material-ui/Divider';
import ClassNameProps from './classname-props';
import Card, { CardContent, CardProps } from 'material-ui/Card';

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

const offset: number = 12;

const StyledForm = styled.form`
  display: flex;
  margin: 0 0 24px 0;
`;

const TodoCard: React.SFC<ClassNameProps & CardProps> = props =>
  <Card className={props.className} {...props}/>;

const StyledTodoCard = styled(TodoCard)`
  width: 98%;
  max-width: 500px;
  margin: 15px auto;
`;

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

export default class App extends React.PureComponent<StateFromProps & DispatchFromProps, {}> {

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

  private onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.input.value.length > 0) {
      const value: string = this.input.value;
      this.input.value = '';
      this.props.actions.onAdd(value);
    }
  }

}
