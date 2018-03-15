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
    onSetFilter: (filter: FilterType) => dispatch(actionCreator.setFilter(filter)),
    onToggle: (id: number) => dispatch(actionCreator.toggleTodo(id)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
