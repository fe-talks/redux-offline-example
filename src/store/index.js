import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import { rootReducer } from './rootReducer';

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
      });

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// without Redux DevTools:
// export const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk, logger)
// );
