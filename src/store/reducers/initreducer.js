const initState = { hi: "hi" };
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
    default:
      return state;
  }
};

export default InitReducer;
