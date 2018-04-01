import actionCreator from "../../../src/model/actionCreator";
import DatabaseStatus from "../../../src/model/DatabaseStatus";
import { writeToDatabaseStatus } from "../../../src/model/reducers/writeToDatabaseStatus";

// TODO DRY
test("'set database status' action", () => {
  expect(writeToDatabaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Idle)))
    .toBe(DatabaseStatus.Idle);
  expect(writeToDatabaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Loading)))
    .toBe(DatabaseStatus.Loading);
  expect(writeToDatabaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Success)))
    .toBe(DatabaseStatus.Success);
  expect(writeToDatabaseStatus(undefined, actionCreator.setDatabaseStatus(DatabaseStatus.Error)))
    .toBe(DatabaseStatus.Error);
});
