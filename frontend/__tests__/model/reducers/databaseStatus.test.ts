import actionCreator from "../../../src/model/actionCreator";
import DatabaseStatus from "../../../src/model/DatabaseStatus";
import { databaseStatus } from "../../../src/model/reducers/databaseStatus";

test("'set database status' action", () => {
  expect(databaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Idle)))
    .toBe(DatabaseStatus.Idle);
  expect(databaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Loading)))
    .toBe(DatabaseStatus.Loading);
  expect(databaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Success)))
    .toBe(DatabaseStatus.Success);
  expect(databaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Error)))
    .toBe(DatabaseStatus.Error);
});
