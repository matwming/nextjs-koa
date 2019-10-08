import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const initialState = {
  count: 0,
  username: "ming"
};

const logger = store => next => action => {
  if (typeof action === "function") {
    console.log("dispatching a function");
  } else {
    console.log("dispatching an action", action);
  }
  const result = next(action);
  console.log("nextState", store.getState());
};
const addAsync = value => {
  console.log("addAsync is triggered", value);
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: "add",
        payload: value
      });
    }, 1500);
  };
};
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        count: state.count + action.payload
      };
    case "update_name":
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
};
addAsync(2);
export default function initializeStore(state) {
  const store = createStore(
    reducer,
    Object.assign({}, initialState, state),
    composeWithDevTools(applyMiddleware(logger, thunk))
  );
  store.subscribe(() => {
    console.log("changed", store.getState());
  });

  store.dispatch({ type: "add", payload: 5 });
  return store;
}
