import * as React from "react";
import FilterType from "../../../model/FilterType";
import ITodoItem from "../../../model/ITodoItem";
import TodosCard from "../presentational/todos-card";

export interface IStateFromProps {
  filterType: FilterType;
  todoItems: ITodoItem[];
}

export interface IDispatchFromProps {
  actions: {
    onToggle: (id: number) => void;
    onAdd: (text: string) => void;
    onSetFilter: (filter: FilterType) => void;
  };
}

interface IAppProps extends IStateFromProps, IDispatchFromProps {
}

const App: React.SFC<IAppProps> = (props) => {
  const { todoItems, filterType, actions } = props;
  const { onSetFilter, onAdd, onToggle } = actions;

  return (
    <TodosCard
      todoItems={todoItems}
      filterType={filterType}
      onSetFilter={onSetFilter}
      onAdd={onAdd}
      onToggle={onToggle}
    />
  );
};

export default App;
