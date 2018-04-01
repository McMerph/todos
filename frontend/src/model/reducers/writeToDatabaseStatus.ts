import IAction from "../actions/IAction";
import DatabaseStatus from "../DatabaseStatus";
import { isSetDatabaseStatusAction } from "./ISetDatabaseStatusAction";

// TODO DRY
export const writeToDatabaseStatus = (state = DatabaseStatus.Idle, action: IAction): DatabaseStatus => {
  if (isSetDatabaseStatusAction(action)) {
    return action.status;
  } else {
    return state;
  }
};
