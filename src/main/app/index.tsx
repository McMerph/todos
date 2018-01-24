import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ConnectedApp from './components/ConnectedApp';
import { store } from './store/Store';

import 'typeface-roboto';

import 'normalize.css/normalize.css';
import './main.css';
// TODO Delete? Instead use typeface-roboto? How?
import './fonts.css';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <ConnectedApp/>
    </Provider>,
    document.getElementsByTagName('main')[0] as HTMLElement
  );
});
