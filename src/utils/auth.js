export const isLoggedIn = () => {
  const user = localStorage.getItem('user');
  return !!user;
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};