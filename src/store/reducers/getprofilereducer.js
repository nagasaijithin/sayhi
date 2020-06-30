const initState = false;
const getProfileReducer = (state = initState, actions) => {
  switch (actions.type) {
    case "GET_PROFILE":
      return { ...actions.payload };
    default:
      return state;
  }
};

export default getProfileReducer;
