// it's enhancer for rootReducer to modify offline path
const enhanceOffline = reducer => {
  // take original reducer and return new one:
  return function(state, action) {
    console.log('offline enhancer', action);

    switch (action.type) {
      // you can just omit actions so you can detect REMOVE_POST and drop it (if offline) and also remove ADD_POST from outbox
      // case 'ADD_POST':
      //   return state;
      case 'DO_SOMETHING':
        if (!state.offline || !state.offline.outbox) {
          console &&
            console.log &&
            console.log(
              'warn',
              `state.offline or state.offline.outbox is undefined! Omitting DO_SOMETHING action.`
            );
          return reducer(state, action);
        }

        /*
        It's example for case like:
        1. user goes offline
        2. user adds post
        3. user removes this post (before sync)
        We have ADD_POST and REMOVE_POST in outbox so we don't want to make this calls
        On remove post we can call DO_SOMETHING action which will check for all waiting outbox actions and remove them
         */
        const outbox = [];
        state.offline.outbox.forEach(outboxAction => {
          if (
            outboxAction.payload.type === 'ADD_POST' &&
            outboxAction.payload.internalId === 'some'
          ) {
            // nothing - drop this post (or do something else with it and push to outbox)
          } else {
            outbox.push(outboxAction);
          }
        });

        return { ...state, offline: { ...state.offline, outbox } };
      default:
        // just proxy all other actions
        return reducer(state, action);
    }
  };
};

export default enhanceOffline;
