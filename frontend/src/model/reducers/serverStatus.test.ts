import actionCreator from "../actionCreator";
import ServerStatus from "../ServerStatus";
import { serverStatus } from "./serverStatus";

// TODO DRY
test("'set database status' action", () => {
  expect(serverStatus(undefined, actionCreator.setServerStatus(ServerStatus.Idle)))
    .toBe(ServerStatus.Idle);
  expect(serverStatus(undefined, actionCreator.setServerStatus(ServerStatus.Loading)))
    .toBe(ServerStatus.Loading);
  expect(serverStatus(undefined, actionCreator.setServerStatus(ServerStatus.Success)))
    .toBe(ServerStatus.Success);
  expect(serverStatus(undefined, actionCreator.setServerStatus(ServerStatus.Error)))
    .toBe(ServerStatus.Error);
});
