import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import DatabaseStatus from "../DatabaseStatus";

interface ISetDatabaseStatusAction extends IAction {
  status: DatabaseStatus;
}

function isSetDatabaseStatusAction(action: IAction): action is ISetDatabaseStatusAction {
  const cast: ISetDatabaseStatusAction = action as ISetDatabaseStatusAction;
  return cast.type === ActionType.SetDatabaseStatus &&
    Object.values(DatabaseStatus).includes(cast.status);
}

export const databaseStatus = (state: DatabaseStatus = DatabaseStatus.Idle, action: IAction): DatabaseStatus => {
  if (isSetDatabaseStatusAction(action)) {
    return action.status;
  } else {
    return state;
  }
};
