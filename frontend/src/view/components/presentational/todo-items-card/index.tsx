import { CardContent } from "material-ui/Card";
import Divider from "material-ui/Divider";
import * as React from "react";
import { FormEvent } from "react";
import DatabaseStatus from "../../../../model/DatabaseStatus";
import FilterType from "../../../../model/FilterType";
import ITodoItem from "../../../../model/ITodoItem";
import DatabaseControl, { Type } from "../database-control";
import FilterChooser from "../filter-chooser";
import TodoItems from "../todo-items";
import TodoTextField from "../todo-text-field";
import { StyledAddTodoButton, StyledForm, StyledTodoCard } from "./styled";

interface IProps {
  filter: FilterType;
  todoItems: ITodoItem[];
  databaseStatus: DatabaseStatus;
  onAdd: (text: string) => void;
  onRetrieve: () => void;
  onSetFilter: (filter: FilterType) => void;
  onToggle: (index: number) => void;
}

interface IState {
  value: string;
}

export default class TodoItemsCard extends React.PureComponent<IProps, IState> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { value: "" };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <StyledTodoCard>
        <CardContent>
          <StyledForm onSubmit={this.onSubmit}>
            <TodoTextField value={this.state.value} onChange={this.onChange}/>
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
          <DatabaseControl
            type={Type.Download}
            status={this.props.databaseStatus}
            text="Retrieve from database"
            onRetrieve={this.props.onRetrieve}
          />
          <DatabaseControl
            type={Type.Upload}
            status={this.props.databaseStatus}
            text="Write to database"
            onRetrieve={this.props.onRetrieve}
          />
        </CardContent>
      </StyledTodoCard>
    );
  }

  private onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.state.value.length > 0) {
      this.props.onAdd(this.state.value);
      this.setState({ value: "" });
    }
  }

  private onChange(event: FormEvent<HTMLInputElement>): void {
    const value: string = event.currentTarget.value;
    this.setState({ value });
  }

}
