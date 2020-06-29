const initState = { friends: [] };
const getFriends = (state = initState, action) => {
  switch (action.type) {
    case "GET_FRIEND":
      if (state.friends.length <= 0) {
        state.friends.push(action.payload);
        return { ...state };
      } else {
        const userinthere = state.friends.some(
          (data) => data.uid === action.payload.uid
        );
        if (!userinthere) {
          state.friends.push(action.payload);
          return { ...state };
        }
        return { ...state };
      }
    default:
      return state;
  }
};
export default getFriends;
