import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import { rootReducer } from './rootReducer';
import enhanceOffline from 'store/data/offline';

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
      });

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    offline(offlineConfig),

    // https://github.com/zalmoxisus/redux-devtools-extension/issues/365
    createStore => (reducer, preloadedState, enhancer) =>
      enhancer(createStore)(enhanceOffline(reducer), preloadedState)
  )
);

// without Redux DevTools:
// export const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk, logger)
// );
