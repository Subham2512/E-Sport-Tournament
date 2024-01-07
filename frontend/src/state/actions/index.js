export const loginState = (state) => {
  return (dispatch) => {
    dispatch({
      type: "login",
      payload: state,
    });
  };
};

export const loggedUser = (state) => {
  return (dispatch) => {
    dispatch({
      type: "user",
      payload: state,
    });
  };
};

export const userId = (state) => {
  return (dispatch) => {
    dispatch({
      type: "userId",
      payload: state,
    });
  };
};
