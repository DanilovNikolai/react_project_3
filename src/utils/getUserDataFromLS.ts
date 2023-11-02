import { userSliceState } from "redux/user/types";

export const getUserDataFromLS = (): userSliceState => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return {
    username: user.username,
    email: user.email,
    token: user.token,
    id: user.id,
  };
};
