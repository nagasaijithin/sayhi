const initState = { error: "", success: "" };
const notifierReducer = (state = initState, action) => {
  switch (action.type) {
    case "NTFY_SUCCESS_MSG":
      state.success = action.payload;
      return { ...state };
    case "NTFY_SUCCESS_MSG_CLEAR":
      state.success = "";
      return { ...state };
    case "NTFY_ERROR_MSG":
      state.error = action.payload;
      return { ...state };
    case "NTFY_ERROR_MSG_CLEAR":
      state.error = "";
      return { ...state };
    default:
      return state;
  }
};

export default notifierReducer;
