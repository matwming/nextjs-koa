export const countState = {
  count: 0
};

export const addAsync = value => {
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
export const countReducer = (state = countState, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        count: state.count + action.payload
      };

    default:
      return state;
  }
};
