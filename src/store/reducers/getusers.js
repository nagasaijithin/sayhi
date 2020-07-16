const initState = { users: [] };
const getusersReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      state.users = action.payload;
      return state;
    case "CLEAR_THE_USERS":
      state.users = [];
      return state;
    default:
      return state;
  }
};
export default getusersReducer;
