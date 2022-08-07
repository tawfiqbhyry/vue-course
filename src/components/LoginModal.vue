<template>
  <section
    class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
    @click="close()"
  ></section>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
        <div class="p-2 border">
          <h1 class="text-4xl text-center">Login</h1>
          <GoogleLogin @close-login-google="close" />
          <form class="p-2 my-2" @submit.prevent="submitData()">
            <div class="my-4 mail">
              <label>username or email</label>
              <input
                placeholder="username or email"
                type="email"
                v-model="form.username"
                name="mail"
                class="rounded shadow p-2 w-full"
                ref="mail"
              />
            </div>
            <div class="my-4 password">
              <label>password</label>
              <input
                placeholder="enter your password"
                type="password"
                name="password"
                v-model="form.password"
                class="rounded shadow p-2 w-full"
              />
            </div>
            <div class="my-4">
              <button
                type="submit"
                class="
                  w-full
                  rounded
                  shadow-md
                  bg-gradient-to-r
                  from-red-800
                  to-pink-600
                  text-white
                  px-4
                  py-2
                  cursor-pointer
                "
              >
                <span v-if="!isLoading">Login</span>
                <span v-if="isLoading">⏳</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../utilities/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleLogin from "./Login/GoogleLogin.vue";
export default {
  data() {
    return {
      form: { username: "", password: "" },
      isLoading: false,
    };
  },
  methods: {
    submitData() {
      this.isLoading = true;
      signInWithEmailAndPassword(
        firebase.auth(),
        this.form.username,
        this.form.password
      )
        .then(() => {
          this.isLoading = false;
          this.form.username = "";
          this.form.password = "";
          this.close();
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    close() {
      this.$emit("close-login");
    },
  },
  mounted() {
    this.$refs.mail.focus();
  },
  components: { GoogleLogin },
};
</script>

<style>
</style>