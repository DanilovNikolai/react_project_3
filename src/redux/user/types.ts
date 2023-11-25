export interface userSliceState {
  username: string | null | undefined;
  email: string;
  token: string;
  id: string;
  cart: [];
  bonus: number;
}
