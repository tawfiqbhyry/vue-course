<template>
  <div class="m-auto">
    <h1 class="text-2xl my-2 text-center">Vue Calender</h1>
    <section class="flex justify-between mx-5">
      <h1 class="font-bold">{{ currentMonthName }}</h1>
      <h1 class="font-bold">{{ currentYear }}</h1>
    </section>
    <section class="flex my-2">
      <p
        class="p-2 text-center text-3xl font-bold"
        style="width: 14.285%"
        v-for="i in days"
        :key="i"
      >
        {{ i }}
      </p>
    </section>
    <section class="flex flex-wrap">
      <p
        style="width: 11.28%; margin: 5px 1.5%"
        v-for="i in getFirstDay()"
        :key="i"
        class="p-2 text-center"
      ></p>
      <p
        style="width: 11.28%; margin: 5px 1.5%"
        v-for="i in getDaysInMonth()"
        :key="i"
        class="p-2 text-center rounded-md"
        :class="
          thisDay(i)
            ? 'bg-blue-500 text-yellow-200 text-2xl font-bold'
            : 'bg-gray-200 text-gray-700 rounded-md text-2xl'
        "
      >
        {{ i }}
      </p>
    </section>
    <section class="flex justify-between mx-10">
      <button class="p-2 text-center" @click="prevMonth">
        <font-awesome-icon
          :icon="['fa-solid', 'fa-chevron-left']"
          class="pre"
        />
      </button>
      <button class="p-2 text-center" @click="nextMonth">
        <font-awesome-icon
          :icon="['fa-solid', 'fa-chevron-right']"
          class="next"
        />
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      currentDateL: "",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    };
  },
  methods: {
    getDaysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    }, // getDaysInMonth
    getFirstDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
      // getFirstDay
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.currentMonthName = new Date().toLocaleString("default", {
        month: "long",
      });
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.currentMonthName = new Date().toLocaleString("default", {
        month: "long",
      });
    },
    thisDay(i) {
      const calenderFullDate = new Date(
        this.currentYear,
        this.currentMonth,
        i
      ).toDateString();
      const currentFullDate = new Date().toDateString();
      return calenderFullDate == currentFullDate;
    },
  },
  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString(
        "default",
        { month: "long" }
      );
    },
  },
};
</script>

<style>
.next:hover,
.pre:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.3s;
}
</style>