import * as React from "react";
import FilterType from "../../../model/FilterType";
import ITodoItem from "../../../model/ITodoItem";
import ServerStatus from "../../../model/ServerStatus";
import ApplicationBar from "../presentational/application-bar";
import TodoItemsCard from "../presentational/todo-items-card";

export interface IStateFromProps {
  filter: FilterType;
  todoItems: ITodoItem[];
  serverStatus: ServerStatus;
}

export interface IDispatchFromProps {
  actions: {
    onAdd: (text: string) => void;
    onRetrieve: () => void;
    onSetFilter: (filter: FilterType) => void;
    onToggle: (index: number) => void;
  };
}

export default class App extends React.PureComponent<IStateFromProps & IDispatchFromProps, {}> {

  public componentDidMount(): void {
    this.props.actions.onRetrieve();
  }

  public render(): React.ReactNode {
    const { serverStatus, todoItems, filter, actions } = this.props;
    const { onAdd, onRetrieve, onSetFilter, onToggle } = actions;

    return (
      <React.Fragment>
        <ApplicationBar serverStatus={serverStatus}/>
        <TodoItemsCard
          serverStatus={serverStatus}
          todoItems={todoItems}
          filter={filter}
          onAdd={onAdd}
          onRetrieve={onRetrieve}
          onSetFilter={onSetFilter}
          onToggle={onToggle}
        />
      </React.Fragment>
    );
  }
}
