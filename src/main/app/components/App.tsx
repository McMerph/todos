import * as React from 'react';
import { FormEvent } from 'react';
import TodoItem from '../store/TodoItem';
import TodoList from './TodoList';
import FilterChooser from './FilterChooser';
import { Filters } from '../store/actions/filter/SetFilterAction';
import TextField from './text-fields/index';
import { Card } from './Card';
import styled from 'styled-components';
import Button from 'material-ui/Button';

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

const AddButton: React.SFC = () => <Button raised={true} color="primary" type="submit">Add</Button>;
const StyledAddButton = styled(AddButton)` margin-left: 10px; `;

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

  // TODO Delete spinner
  public render(): React.ReactNode {
    return (
      <AppCard>
        <StyledForm onSubmit={this.onSubmit}>
          <TextField
            setInput={(input: HTMLInputElement) => this.input = input}
            caption="Todo"
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
