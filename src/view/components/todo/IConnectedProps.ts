import { Filter } from "../../../model/actions/filter/ISetFilterAction";
import ITodoItem from "../../../model/ITodoItem";

export interface IStateFromProps {
  filter: Filter;
  todoItems: ITodoItem[];
}

export interface IDispatchFromProps {
  actions: {
    onToggle: (id: number) => void;
    onAdd: (text: string) => void;
    onSetFilter: (filter: Filter) => void;
  };
}

export default interface IConnectedProps extends IStateFromProps, IDispatchFromProps {
}
