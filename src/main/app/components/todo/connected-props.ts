import { Filters } from '../../store/actions/filter/set-filter-action';
import TodoItem from '../../store/todo-item';

export interface StateFromProps {
  filter: Filters;
  todoItems: TodoItem[];
}

export interface DispatchFromProps {
  actions: {
    onToggle: (id: number) => void;
    onAdd: (text: string) => void;
    onSetFilter: (filter: Filters) => void;
  };
}

export default interface ConnectedProps extends StateFromProps, DispatchFromProps {
}
