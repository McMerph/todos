import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actionCreator } from "../../../model/actions/actionCreator";
import { Filter } from "../../../model/actions/filter/ISetFilterAction";
import { IStore } from "../../../model/IStore";
import { IDispatchFromProps, IStateFromProps } from "./IConnectedProps";
import Todo from "./todo";

// TODO Rename file to index.tsx?
const mapStateToProps: (store: IStore) => IStateFromProps = (store) => ({
  filter: store.filter,
  todoItems: store.todoItems,
});

const mapDispatchToProps: (dispatch: Dispatch<IStore>) => IDispatchFromProps = (dispatch) => ({
  actions: {
    onAdd: (text: string) => dispatch(actionCreator.addTodo(text)),
    onSetFilter: (filter: Filter) => dispatch(actionCreator.setFilter(filter)),
    onToggle: (id: number) => dispatch(actionCreator.toggleTodo(id)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
