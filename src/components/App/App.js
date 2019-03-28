import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'store';
import { MainWrapper } from 'components/MainWrapper';

export function App() {
  return (
    <Provider store={store}>
      <MainWrapper />
    </Provider>
  );
}

App.defaultProps = {};

App.propTypes = {};

App.displayName = 'App';
