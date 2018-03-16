import ActionType from "./actions/ActionType";
import FilterType from "./FilterType";

const actionCreator = {
  addTodo: (text: string) => ({ type: ActionType.AddTodo, text }),
  setFilter: (filter: FilterType) => ({ type: ActionType.SetFilter, filter }),
  toggleTodo: (id: number) => ({ type: ActionType.ToggleTodo, id }),
};

export default actionCreator;
