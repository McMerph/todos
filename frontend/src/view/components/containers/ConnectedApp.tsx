import { connect } from "react-redux";
import { Dispatch } from "redux";
import actionCreator from "../../../model/actionCreator";
import FilterType from "../../../model/FilterType";
import IStore from "../../../model/IStore";
import App, { IDispatchFromProps, IStateFromProps } from "./App";

const mapStateToProps: (store: IStore) => IStateFromProps = (store) => store;

const mapDispatchToProps: (dispatch: Dispatch<IStore>) => IDispatchFromProps = (dispatch) => ({
  actions: {
    onAdd: (text: string) => dispatch(actionCreator.addTodo(text)),
    onRetrieve: () => dispatch(actionCreator.retrieveTodoItems()),
    onSetFilter: (filter: FilterType) => dispatch(actionCreator.setFilter(filter)),
    onToggle: (index: number) => dispatch(actionCreator.toggleTodo(index)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
