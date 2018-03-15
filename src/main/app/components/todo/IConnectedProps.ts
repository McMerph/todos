import { Filters } from "../../store/actions/filter/ISetFilterAction";
import TodoItem from "../../store/todo-item";

export interface IStateFromProps {
  filter: Filters;
  todoItems: TodoItem[];
}

export interface IDispatchFromProps {
  actions: {
    onToggle: (id: number) => void;
    onAdd: (text: string) => void;
    onSetFilter: (filter: Filters) => void;
  };
}

export default interface IConnectedProps extends IStateFromProps, IDispatchFromProps {
}
