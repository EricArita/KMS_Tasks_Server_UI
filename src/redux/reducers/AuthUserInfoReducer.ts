let initialState = {
  userName: "",
  email: "",
};

export const AuthUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_AUTH_USER_INFO":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
