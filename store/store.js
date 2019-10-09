import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
import { countState, addAsync } from "./reducers/countReducer";
import { userInitialState } from "./reducers/userReducer";
const logger = store => next => action => {
  if (typeof action === "function") {
    console.log("dispatching a function");
  } else {
    console.log("dispatching an action", action);
  }
  const result = next(action);
  console.log("nextState", store.getState());
};

export default function initializeStore(state) {
  const store = createStore(
    rootReducer,
    Object.assign(
      {},
      {
        count: countState,
        user: userInitialState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(logger, thunk))
  );
  store.subscribe(() => {
    console.log("changed", store.getState());
  });

  store.dispatch({ type: "add", payload: 1 });
  store.dispatch(addAsync(2));
  store.dispatch({ type: "update_name", payload: "ying" });
  return store;
}
