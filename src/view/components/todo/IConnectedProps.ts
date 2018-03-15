import { Filters } from "../../../model/actions/filter/ISetFilterAction";
import ITodoItem from "../../../model/ITodoItem";

export interface IStateFromProps {
  filter: Filters;
  todoItems: ITodoItem[];
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
