import * as React from 'react';
import { FormEvent } from 'react';
import TodoItem from '../store/TodoItem';
import TodoList from './TodoList';
import FilterChooser from './FilterChooser';
import { Filters } from '../store/actions/filter/SetFilterAction';
import { Card } from './Card';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

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

interface DummyProps {
  className?: string;
}

const AppCard = Card.extend`
  width: 98%;
  max-width: 500px;
  margin: 15px auto;
`;

const AddButton: React.SFC<DummyProps> = props =>
  <Button className={props.className} raised={true} color="primary" type="submit">Add</Button>;
const StyledAddButton = styled(AddButton)` margin: 0 10px; `;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: baseline;
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
          <TextField
            label="Todo"
            inputRef={(input: HTMLInputElement) => this.input = input}
          />
          <StyledAddButton/>
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
