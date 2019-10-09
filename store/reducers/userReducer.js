import { createStore, compose, applyMiddleware, combineReducers } from "redux";

export const userInitialState = {
  username: "ming"
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "update_name":
      return {
        username: action.payload
      };
    default:
      return state;
  }
};
