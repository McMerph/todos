import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Filters } from "../../../model/actions/filter/ISetFilterAction";
import { actionProducer } from "../../../model/actions/IActionProducer";
import { IAppStore } from "../../../model/store";
import { IDispatchFromProps, IStateFromProps } from "./IConnectedProps";
import Todo from "./todo";

// TODO Rename file to index.tsx?
const mapStateToProps: (store: IAppStore) => IStateFromProps = (store) => ({
  filter: store.filter,
  todoItems: store.todoItems,
});

const mapDispatchToProps: (dispatch: Dispatch<IAppStore>) => IDispatchFromProps = (dispatch) => ({
  actions: {
    onAdd: (text: string) => dispatch(actionProducer.addTodo(text)),
    onSetFilter: (filter: Filters) => dispatch(actionProducer.setFilter(filter)),
    onToggle: (id: number) => dispatch(actionProducer.toggleTodo(id)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
