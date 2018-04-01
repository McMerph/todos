import { Dispatch } from "redux";
import ActionType from "./actions/ActionType";
import { retrieve } from "./api";
import DatabaseStatus from "./DatabaseStatus";
import FilterType from "./FilterType";
import IStore from "./IStore";

const actionCreator = {
  addTodo: (text: string) => ({ type: ActionType.AddTodo, text }),
  retrieveTodoItems: () => {
    return (dispatch: Dispatch<IStore>) => {
      dispatch({ type: ActionType.SetReadFromDatabaseStatus, status: DatabaseStatus.Loading });
      retrieve("http://localhost:48702/todos-webapi/?firstResult=0&maxResults=10")
        .then((response) => {
          dispatch({ type: ActionType.SetTodoItems, todoItems: response.todoItems });
          dispatch({ type: ActionType.SetReadFromDatabaseStatus, status: DatabaseStatus.Success });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: ActionType.SetReadFromDatabaseStatus, status: DatabaseStatus.Error });
        });
    };
  },
  setDatabaseStatus: (status: DatabaseStatus) => ({ type: ActionType.SetReadFromDatabaseStatus, status }),
  setFilter: (filter: FilterType) => ({ type: ActionType.SetFilter, filter }),
  toggleTodo: (index: number) => ({ type: ActionType.ToggleTodo, index }),
};

export default actionCreator;
