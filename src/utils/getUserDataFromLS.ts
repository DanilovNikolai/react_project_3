import { userSliceState } from "redux/user/types";

export const getUserDataFromLS = (): userSliceState => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (user) {
    return {
      username: user.username || "",
      email: user.email || "",
      token: user.token || "",
      id: user.id || "",
    };
  }

  return {
    username: "",
    email: "",
    token: "",
    id: "",
  };
};
