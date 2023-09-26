import { combineReducers } from "redux";

const authenticationReducer = (
  state = {
    isAuth: false,
    id: "",
    token: "",
    phoneNumber: "",
    expiration: "",
    role: "",
  },
  action
) => {
  switch (action.type) {
    case "SET_AUTHENTICATION":
      return { ...state, ...action.authentication };
    default:
      return state;
  }
};

export default combineReducers({
  authentication: authenticationReducer,
});
