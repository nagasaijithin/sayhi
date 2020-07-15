const initState = { name: "", profile: "", tAc: false };
const InitReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUC":
      return { ...state };
    case "LOGIN_ERR":
      return { ...state };
    case "SIGNOUT_SUC":
      return { ...state };

    case "CLEAR_THE_POPUP":
      state.tAc = false;
      return { ...state };
    case "CREATE_USE_SUC":
      state.tAc = true;
      return { ...state };
    case "CREATE_USE_ERR":
      return { ...state };
    case "GET_NAME":
      state.name = action.payload.name;
      state.profile = action.payload.profile;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default InitReducer;
