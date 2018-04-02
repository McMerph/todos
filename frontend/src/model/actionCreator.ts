import { Dispatch } from "redux";
import ActionType from "./actions/ActionType";
import { retrieve } from "./api";
import FilterType from "./FilterType";
import IStore from "./IStore";
import ITodoItem from "./ITodoItem";
import ServerStatus from "./ServerStatus";

const actionCreator = {
  addTodo: (text: string) => ({ type: ActionType.AddTodo, text }),
  retrieveTodoItems: () => {
    return (dispatch: Dispatch<IStore>) => {
      const todoItems: ITodoItem[] = [];
      // TODO Move to constants
      let first: number = 0;
      const max: number = 10;

      const retrieveNext = () => {
        retrieve(`http://localhost:48702/todos-webapi/?firstResult=${first}&maxResults=${max}`)
          .then((response) => {
            todoItems.push(...response.todoItems);
            if (response.count > first + max) {
              first += max;
              retrieveNext();
            } else {
              dispatch({ type: ActionType.SetTodoItems, todoItems });
              dispatch({ type: ActionType.SetServerStatus, status: ServerStatus.Success });
            }
          })
          .catch((error) => {
            console.error(error);
            dispatch({ type: ActionType.SetServerStatus, status: ServerStatus.Error });
          });
      };
      dispatch({ type: ActionType.SetServerStatus, status: ServerStatus.Loading });
      retrieveNext();
    };
  },
  setFilter: (filter: FilterType) => ({ type: ActionType.SetFilter, filter }),
  setServerStatus: (status: ServerStatus) => ({ type: ActionType.SetServerStatus, status }),
  toggleTodo: (index: number) => ({ type: ActionType.ToggleTodo, index }),
};

export default actionCreator;
