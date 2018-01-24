import * as React from 'react';
import { FormEvent } from 'react';
import TodoItem from '../store/TodoItem';
import TodoList from './TodoList';
import FilterChooser from './FilterChooser';
import { Filters } from '../store/actions/filter/SetFilterAction';
import RippleButton, { ButtonType } from './buttons/ripple-button';
import TextField from './text-fields/index';
import { Card } from './Card';
import styled from 'styled-components';

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

const StyledRippleButton = styled(RippleButton)`
  margin-left: 10px;
`;
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
          <StyledRippleButton text="Add" buttonType={ButtonType.Submit}/>
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
