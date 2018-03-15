import ITodoItem from "../../../model/ITodoItem";
import { FilterType } from "../../../model/reducers/filter";

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

export default interface IConnectedProps extends IStateFromProps, IDispatchFromProps {
}
