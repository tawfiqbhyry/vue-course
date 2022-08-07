<template>
  <section class="flex w-full h-screen">
    <div class="m-auto w-3/4 border rounded-lg shadow-lg p-3 mt-10">
      <button
        class="my-2 px-4 py-2 shadow-lg border rounded-lg hover:cursor-pointer"
        @click="state.isModalOpened = true"
      >
        Add User
      </button>
      <table class="w-full border rounded-sm">
        <thead>
          <th class="px-4 py-2 border text-center">ID</th>
          <th class="px-4 py-2 border text-center">Avatar</th>
          <th class="px-4 py-2 border text-center">first name</th>
          <th class="px-4 py-2 border text-center">Last Name</th>
          <th class="px-4 py-2 border text-center">Email</th>
          <th class="px-4 py-2 border text-center">Delete</th>
        </thead>
        <tbody>
          <tr v-for="user in state.users" :key="user" class="w-full">
            <td class="px-4 py-2 border text-center">{{ user.id }}</td>
            <td class="flex justify-center py-2 border text-center">
              <img
                :src="user.avatar"
                :alt="user.first_name"
                class="border rounded-full"
                width="100"
                height="100"
              />
            </td>
            <td class="px-4 py-2 border text-center">{{ user.first_name }}</td>
            <td class="px-4 py-2 border text-center">{{ user.last_name }}</td>
            <td class="px-4 py-2 border text-center">{{ user.email }}</td>
            <td class="px-4 py-2 border text-center">
              <button
                class="
                  px-4
                  py-2
                  bg-red-500
                  border
                  rounded-lg
                  shadow-md
                  hover:bg-red-300
                  text-white
                "
                @click="deleteUser(user)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="w-full flex justify-between mt-2">
        <button
          class="px-4 py-2 border shadow-lg"
          :class="state.previousDisabled ? 'bg-gray-500' : ''"
          @click="previous"
          :disabled="state.previousDisabled"
        >
          prev
        </button>
        <button
          class="px-4 py-2 border shadow-lg"
          :class="state.nextDisabled ? 'bg-gray-500' : ''"
          @click="next"
          :disabled="state.nextDisabled"
        >
          next
        </button>
      </div>
    </div>
  </section>
  <teleport to="body">
    <ModalComponent
      v-if="state.isModalOpened"
      @close="state.isModalOpened = false"
    >
      <template #header> Add new user </template>
      <template #body>
        <form
          @submit.prevent="addUser"
          class="w-full my-2 flex flex-col justify-center"
        >
          <input
            type="text"
            class="w-full my-2 p-2 border rounded-lg shadow-md"
            placeholder="Enter user first name"
            v-model="state.form.first_name"
          />
          <input
            type="text"
            class="w-full my-2 p-2 border rounded-lg shadow-md"
            placeholder="Enter user last name"
            v-model="state.form.last_name"
          />
          <input
            type="email"
            class="w-full my-2 p-2 border rounded-lg shadow-md"
            placeholder="Enter user email"
            v-model="state.form.email"
          />
          <input
            type="text"
            class="w-full my-2 p-2 border rounded-lg shadow-md"
            placeholder="Enter user avatar"
            v-model="state.form.avatar"
          />
          <button
            type="submit"
            class="
              w-1/2
              px-4
              py-2
              m-auto
              border
              rounded-lg
              shadow-md
              text-gray-500
            "
          >
            Add user
          </button>
        </form>
      </template>
    </ModalComponent>
  </teleport>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "../plugins/axios";
import ModalComponent from "../components/ModalComponent";

export default {
  components: {
    ModalComponent,
  },
  setup() {
    const state = reactive({
      users: [],
      currentPage: 1,
      total_pages: 0,
      nextDisabled: false,
      previousDisabled: false,
      isModalOpened: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        avatar: "",
      },
    });

    onMounted(async () => {
      const { data } = await axios.get(`/users?page=1`);
      state.users = data.data;
      state.total_pages = data.total_pages;
    });
    async function next() {
      state.currentPage++;
      if (state.currentPage > state.total_pages) {
        state.currentPage = state.total_pages;
        alert("No more pages");
        state.nextDisabled = true;
      } else {
        const { data } = await axios.get(`/users?page=${state.currentPage}`);
        state.users = data.data;
        state.previousDisabled = false;
        state.nextDisabled = false;
      }
    }
    async function previous() {
      state.currentPage--;
      if (state.currentPage < 1) {
        state.currentPage = 1;
        alert("This is the first page");
        state.previousDisabled = true;
      } else {
        const { data } = await axios.get(`/users?page=${state.currentPage}`);
        state.users = data.data;
        state.previousDisabled = false;
        state.nextDisabled = false;
      }
    }

    async function addUser() {
      await axios
        .post("/users", state.form)
        .then((res) => {
          state.users.push(res.data);
          state.form.first_name = "";
          state.form.last_name = "";
          state.form.email = "";
          state.form.avatar = "";
          state.isModalOpened = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function deleteUser(user) {
      await axios.delete(`/users/${user.id}`).then(() => {
        state.users = state.users.filter((u) => u.id !== user.id);
      });
    }

    return {
      state,
      next,
      previous,
      addUser,
      deleteUser,
    };
  },
};
</script>

<style>
</style>