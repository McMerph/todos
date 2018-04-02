import FilterType from "./FilterType";
import ITodoItem from "./ITodoItem";
import ServerStatus from "./ServerStatus";

export default interface IStore {
  filter: FilterType;
  serverStatus: ServerStatus;
  todoItems: ITodoItem[];
}
