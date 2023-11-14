export const saveUsersCartToLS = (items) => {
  if (localStorage.getItem("currentUser")) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userEmail = currentUser.email;
    currentUser.cart = items;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    if (localStorage.getItem("users")) {
      const users = JSON.parse(localStorage.getItem("users"));
      const updatedUsers = users.map((user) => {
        if (user?.email === userEmail) {
          user.cart = items;
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  }
};
