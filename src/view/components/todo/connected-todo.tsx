import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actionCreator } from "../../../model/actionCreator";
import { IStore } from "../../../model/IStore";
import { FilterType } from "../../../model/reducers/filter";
import { IDispatchFromProps, IStateFromProps } from "./IConnectedProps";
import Todo from "./todo";

// TODO Rename file to index.tsx?
const mapStateToProps: (store: IStore) => IStateFromProps = (store) => ({
  filterType: store.filterType,
  todoItems: store.todoItems,
});

const mapDispatchToProps: (dispatch: Dispatch<IStore>) => IDispatchFromProps = (dispatch) => ({
  actions: {
    onAdd: (text: string) => dispatch(actionCreator.addTodo(text)),
    onSetFilter: (filter: FilterType) => dispatch(actionCreator.setFilterType(filter)),
    onToggle: (id: number) => dispatch(actionCreator.toggleTodo(id)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
