<template>
  <AppHeader @login-modal-change="changeModal(true)" />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <AppModal v-if="isOpened" @close-login="changeModal(false)" />
  </teleport>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppModal from "./components/LoginModal.vue";
import firebase from "./utilities/firebase";
import { onAuthStateChanged } from "firebase/auth";
import store from "./store";

export default {
  components: { AppHeader, AppModal },
  computed: {
    isOpened: function () {
      return store.state.isModalOpened;
    },
  },

  mounted() {
    onAuthStateChanged(firebase.auth(), (user) => {
      if (user) {
        store.commit("loggedIn", user);
      } else {
        store.commit("SignedOut");
      }
    });
  },
  methods: {
    changeModal(value) {
      store.commit("changeModalState", value);
    },
  },
};
</script>