const loggedUserReducer = (state = '', action) => {
    if (action.type === "user"){
        return action.payload;
    }
    else{
        return state;
    }
}

export default loggedUserReducer;