import * as React from "react";
import FilterType from "../../../model/FilterType";
import ITodoItem from "../../../model/ITodoItem";
import TodoItemsCard from "../presentational/todo-items-card";

export interface IStateFromProps {
  filter: FilterType;
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
  const { todoItems, filter, actions } = props;
  const { onSetFilter, onAdd, onToggle } = actions;

  return (
    <TodoItemsCard
      todoItems={todoItems}
      filter={filter}
      onSetFilter={onSetFilter}
      onAdd={onAdd}
      onToggle={onToggle}
    />
  );
};

export default App;
