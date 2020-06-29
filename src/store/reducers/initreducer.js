const initState = { name: "" };
const InitReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUC":
      console.log("login Suc");
      return { ...state };
    case "LOGIN_ERR":
      console.log("login error" + action.payload);
      return { ...state };
    case "SIGNOUT_SUC":
      console.log("signout");
      return { ...state };
    case "CREATE_USE_SUC":
      return { ...state };
    case "CREATE_USE_ERR":
      console.log(action.payload);
      return { ...state };
    case "GET_NAME":
      return {
        name: action.payload.name,
        profile: action.payload.profile,
      };

    default:
      return state;
  }
};

export default InitReducer;
