import * as React from "react";
import DatabaseStatus from "../../../model/DatabaseStatus";
import FilterType from "../../../model/FilterType";
import ITodoItem from "../../../model/ITodoItem";
import TodoItemsCard from "../presentational/todo-items-card";

export interface IStateFromProps {
  filter: FilterType;
  todoItems: ITodoItem[];
  databaseStatus: DatabaseStatus;
}

export interface IDispatchFromProps {
  actions: {
    onAdd: (text: string) => void;
    onRetrieve: () => void;
    onSetFilter: (filter: FilterType) => void;
    onToggle: (index: number) => void;
  };
}

interface IAppProps extends IStateFromProps, IDispatchFromProps {
}

const App: React.SFC<IAppProps> = (props) => {
  const { databaseStatus, todoItems, filter, actions } = props;
  const { onAdd, onRetrieve, onSetFilter, onToggle } = actions;

  return (
    <TodoItemsCard
      databaseStatus={databaseStatus}
      todoItems={todoItems}
      filter={filter}
      onAdd={onAdd}
      onRetrieve={onRetrieve}
      onSetFilter={onSetFilter}
      onToggle={onToggle}
    />
  );
};

export default App;
