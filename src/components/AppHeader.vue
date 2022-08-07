<template>
  <nav
    class="
      w-full
      bg-gradient-to-r
      from-blue-800
      to-blue-600
      text-white
      px-4
      py-2
    "
  >
    <router-link
      class="mx-2"
      v-for="item in routers"
      :key="item.to"
      :to="item.to"
      >{{ item.name }}</router-link
    >
    <button
      v-if="!isUserLoggedIn"
      class="mx-2"
      @click="$emit('login-modal-change')"
    >
      Login
    </button>
    <button v-else class="mx-2" @click="signOutUser">Sign out</button>
  </nav>
</template>

<script>
import { signOut } from "firebase/auth";
import firebase from "../utilities/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      routers: [
        { name: "home", to: "/" },
        { name: "dcHeroes", to: "/dc-heroes" },
        { name: "calender", to: "/calender" },
        { name: "markdown", to: "/markdown" },
        { name: "Slider", to: "/slider" },
        { name: "Calculator", to: "/calculator" },
        { name: "reusable modal", to: "/reusable-modal" },
        { name: "chat system", to: "/chat" },
        { name: "user CRUD", to: "/crud-app" },
        { name: "object detection", to: "/tensorflow" },
      ],
    };
  },

  computed: mapState({
    isUserLoggedIn: (state) => state.isUserLoggedIn,
    currentUser: (state) => state.authUser,
  }),

  methods: {
    signOutUser() {
      signOut(firebase.auth())
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.mmessage);
        });
    },
  },
};
</script>

<style>
</style>