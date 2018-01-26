import { connect } from 'react-redux';
import Todo, { DispatchFromProps, StateFromProps } from './todo';
import { AppStore } from '../../store/store';
import { Dispatch } from 'redux';
import { actionProducer } from '../../store/actions/actions-producer';
import { Filters } from '../../store/actions/filter/set-filter-action';

// TODO Rename file to index.tsx?
const mapStateToProps: (store: AppStore) => StateFromProps = store => ({
  filter: store.filter,
  todoItems: store.todoItems
});

const mapDispatchToProps: (dispatch: Dispatch<AppStore>) => DispatchFromProps = dispatch => ({
  actions: {
    onToggle: (id: number) => dispatch(actionProducer.toggleTodo(id)),
    onAdd: (text: string) => dispatch(actionProducer.addTodo(text)),
    onSetFilter: (filter: Filters) => dispatch(actionProducer.setFilter(filter))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
