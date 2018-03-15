import { actionCreator } from "../../../../src/model/actionCreator";
import { filter, FilterType } from "../../../../src/model/reducers/filter";

test("initial state", () => {
  expect(filter(undefined, {type: "dummy"})).toBe(FilterType.All);
});

test("'set filter' action", () => {
  expect(filter(undefined, actionCreator.setFilterType(FilterType.All))).toBe(FilterType.All);
  expect(filter(undefined, actionCreator.setFilterType(FilterType.Completed))).toBe(FilterType.Completed);
  expect(filter(undefined, actionCreator.setFilterType(FilterType.Active))).toBe(FilterType.Active);
});
