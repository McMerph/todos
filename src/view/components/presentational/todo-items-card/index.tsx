import { CardContent } from "material-ui/Card";
import Divider from "material-ui/Divider";
import * as React from "react";
import { FormEvent } from "react";
import FilterType from "../../../../model/FilterType";
import ITodoItem from "../../../../model/ITodoItem";
import FilterChooser from "../filter-chooser";
import TodoItems from "../todo-items";
import { StyledAddTodoButton, StyledForm, StyledTextField, StyledTodoCard } from "./styled";

interface IProps {
  filter: FilterType;
  todoItems: ITodoItem[];
  onToggle: (id: number) => void;
  onAdd: (text: string) => void;
  onSetFilter: (filter: FilterType) => void;
}

// TODO Fix TodoTextField behavior after submit. Controlled component?
export default class TodoItemsCard extends React.PureComponent<IProps, {}> {

  private input: HTMLInputElement;

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <StyledTodoCard>
        <CardContent>
          <StyledForm onSubmit={this.onSubmit}>
            <StyledTextField label="Todo" inputRef={(input: HTMLInputElement) => this.input = input}/>
            <StyledAddTodoButton variant="raised" color="primary" type="submit">Add</StyledAddTodoButton>
          </StyledForm>
          <TodoItems
            filter={this.props.filter}
            todoItems={this.props.todoItems}
            onToggle={this.props.onToggle}
          />
          <Divider/>
          <FilterChooser
            filter={this.props.filter}
            onSetFilter={this.props.onSetFilter}
          />
        </CardContent>
      </StyledTodoCard>
    );
  }

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.input.value.length > 0) {
      const value: string = this.input.value;
      this.input.value = "";
      this.props.onAdd(value);
    }
  }

}
