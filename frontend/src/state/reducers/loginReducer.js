const loginReducer = (state = false, action) => {
    if (action.type === "login"){
        return action.payload;
    }
    else{
        return state;
    }
}

export default loginReducer;