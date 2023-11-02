import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function useAuth() {
  const { username, email, token, id } = useSelector(
    (state: RootState) => state.user
  );

  return {
    username,
    isAuth: !!email,
    email,
    token,
    id,
  };
}
