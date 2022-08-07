<template>
  <div class="flex justify-center">
    <button
      class="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        mt-2
        rounded
      "
      @click="loginGoogle()"
    >
      Login with Google
    </button>
  </div>
</template>

<script>
import firebase from "../../utilities/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default {
  methods: {
    loginGoogle() {
      this.isLoading = true;
      const provider = new GoogleAuthProvider();
      signInWithPopup(firebase.auth(), provider)
        .then(() => {
          this.isLoading = false;
          this.$emit("close-login-google");
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>