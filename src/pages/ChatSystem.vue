<template>
  <section
    class="
      w-1/3
      border
      rounded-lg
      flex
      justify-between
      m-auto
      mt-56
      p-5
      flex-col
      mb-10
      shadow-lg
    "
    style="height: 800px"
    v-if="isAuthenticated"
  >
    <h1 class="text-center text-3xl h-8">Realtime chat</h1>
    <div class="w-fill h-4/5 overflow-scroll">
      <div
        v-for="key in state.chatKeys"
        :key="key"
        class="w-full flex flex-col"
      >
        <div
          class="
            w-4/5
            bg-blue-500
            text-white
            p-3
            mt-3
            border
            rounded-lg
            shadow-lg
            flex-col
          "
          :class="
            state.chats[key].userId === userID
              ? 'flex flex-start'
              : 'flex self-end'
          "
        >
          {{ state.chats[key].message }}
          <p class="text-blue-900 text-sm">
            {{
              state.chats[key].username
                ? state.chats[key].username
                : "no username"
            }}
          </p>
        </div>
      </div>
    </div>
    <input
      placeholder="start typing..."
      type="text"
      class="w-full h-8 p-2 border rounded shadow"
      v-model="state.message"
      @keydown.enter="state.sendMessage"
    />
  </section>
  <div
    v-else
    class="
      w-full
      text-center
      p-10
      flex
      m-auto
      text-3xl
      h-screen
      justify-center
      items-center
      mb-16
    "
  >
    You have to login
  </div>
</template>

<script>
import * as database from "firebase/database";
import { useStore } from "vuex";
import { onMounted, reactive, computed } from "vue";

export default {
  setup() {
    const state = reactive({
      chats: {},
      chatKeys: [],
      message: "",
      sendMessage: null,
    });

    onMounted(() => {
      const db = database.getDatabase();
      const starCountRef = database.ref(db, "chats/");
      database.onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        state.chats = data;
        state.chatKeys = Object.keys(state.chats);
      });
    });
    const store = useStore();
    const isAuthenticated = computed(() => store.state.isUserLoggedIn);
    const authUser = computed(() => store.state.authUser);
    const userID = computed(() => store.state.authUser.uid);

    state.sendMessage = () => {
      const db = database.getDatabase();
      const messages = database.ref(db, "chats");
      const newMessageRef = database.push(messages);
      database.set(newMessageRef, {
        message: state.message,
        username: authUser.value.displayName,
        userId: userID.value,
      });
      state.message = "";
    };
    return { state, isAuthenticated, userID };
  },
};
</script>

<style>
</style>