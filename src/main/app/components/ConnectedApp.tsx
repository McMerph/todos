import { connect } from 'react-redux';
import App, { DispatchFromProps } from './App';
import { AppStore } from '../store/Store';
import { Dispatch } from 'redux';
import { actionProducer } from '../store/actions/ActionsProducer';
import { Filters } from '../store/actions/filter/SetFilterAction';

const mapStateToProps: (store: AppStore) => AppStore = store => {
  return {
    filter: store.filter,
    todoItems: store.todoItems
  };
};

const mapDispatchToProps: (dispatch: Dispatch<AppStore>) => DispatchFromProps = dispatch => {
  return {
    actions: {
      onToggle: (id: number) => dispatch(actionProducer.toggleTodo(id)),
      onAdd: (text: string) => dispatch(actionProducer.addTodo(text)),
      onSetFilter: (filter: Filters) => dispatch(actionProducer.setFilter(filter))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
