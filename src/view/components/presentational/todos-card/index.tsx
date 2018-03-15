import { CardContent } from "material-ui/Card";
import Divider from "material-ui/Divider";
import * as React from "react";
import { FormEvent } from "react";
import FilterType from "../../../../model/FilterType";
import ITodoItem from "../../../../model/ITodoItem";
import FilterChooser from "../filter-chooser";
import TodosList from "../todos-list";
import { StyledAddTodoButton, StyledForm, StyledTextField, StyledTodoCard } from "./styled";

interface IProps {
  filterType: FilterType;
  todoItems: ITodoItem[];
  onToggle: (id: number) => void;
  onAdd: (text: string) => void;
  onSetFilter: (filter: FilterType) => void;
}

// TODO Fix TodoTextField behavior after submit. Controlled component?
export default class TodosCard extends React.PureComponent<IProps, {}> {

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
          <TodosList
            filterType={this.props.filterType}
            todoItems={this.props.todoItems}
            onToggle={this.props.onToggle}
          />
          <Divider/>
          <FilterChooser
            filterType={this.props.filterType}
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
