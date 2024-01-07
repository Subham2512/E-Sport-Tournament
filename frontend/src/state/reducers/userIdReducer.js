const userIdReducer = (state = false, action) => {
  if (action.type === "userId") {
    return action.payload;
  } else {
    return state;
  }
};

export default userIdReducer;
