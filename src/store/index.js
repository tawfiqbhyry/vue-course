import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      isUserLoggedIn: false,
      authUser: {},
      isModalOpened: false,
    };
  },
  mutations: {
    loggedIn(state, user) {
      state.isUserLoggedIn = true;
      state.authUser = user;
    },
    SignedOut(state) {
      state.isUserLoggedIn = false;
      state.authUser = {};
    },
    changeModalState(state, value) {
      state.isModalOpened = value;
    }
  },
});

export default store;
