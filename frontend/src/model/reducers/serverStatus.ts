import IAction from "../actions/IAction";
import { isSetServerStatusAction } from "../actions/ISetServerStatusAction";
import ServerStatus from "../ServerStatus";

export const serverStatus = (state = ServerStatus.Idle, action: IAction): ServerStatus => {
  if (isSetServerStatusAction(action)) {
    return action.status;
  } else {
    return state;
  }
};
