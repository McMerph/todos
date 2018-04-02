import ServerStatus from "../ServerStatus";
import ActionType from "./ActionType";
import IAction from "./IAction";

export default interface ISetServerStatusAction extends IAction {
  status: ServerStatus;
}

export function isSetServerStatusAction(action: IAction): action is ISetServerStatusAction {
  const cast: ISetServerStatusAction = action as ISetServerStatusAction;
  return cast.type === ActionType.SetServerStatus &&
    Object.values(ServerStatus).includes(cast.status);
}
