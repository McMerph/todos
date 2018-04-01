import actionCreator from "../../../src/model/actionCreator";
import DatabaseStatus from "../../../src/model/DatabaseStatus";
import { readFromDatabaseStatus } from "../../../src/model/reducers/readFromDatabaseStatus";

// TODO DRY
test("'set database status' action", () => {
  expect(readFromDatabaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Idle)))
    .toBe(DatabaseStatus.Idle);
  expect(readFromDatabaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Loading)))
    .toBe(DatabaseStatus.Loading);
  expect(readFromDatabaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Success)))
    .toBe(DatabaseStatus.Success);
  expect(readFromDatabaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Error)))
    .toBe(DatabaseStatus.Error);
});
