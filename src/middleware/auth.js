export default function (next, store) {
  if (!store.state.isUserLoggedIn) {
    next("/");
    store.commit("changeModalState", true);
  } else {
    next();
  }
}
