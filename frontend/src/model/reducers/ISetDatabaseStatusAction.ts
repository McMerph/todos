import ActionType from "../actions/ActionType";
import IAction from "../actions/IAction";
import DatabaseStatus from "../DatabaseStatus";

export default interface ISetDatabaseStatusAction extends IAction {
  status: DatabaseStatus;
}

export function isSetDatabaseStatusAction(action: IAction): action is ISetDatabaseStatusAction {
  const cast: ISetDatabaseStatusAction = action as ISetDatabaseStatusAction;
  return cast.type === ActionType.SetReadFromDatabaseStatus &&
    Object.values(DatabaseStatus).includes(cast.status);
}
