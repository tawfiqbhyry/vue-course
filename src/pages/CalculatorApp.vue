<template>
  <div class="w-full flex">
    <div class="m-auto h-screen">
      <h1 class="text-2xl text-center mt-2">Calculator</h1>
      <p
        class="mt-10 text-3xl text-right overflow-x-scroll w-64"
        style="direction: rtl"
      >
        {{ currentValue }}
      </p>
      <div>
        <span v-if="available">{{ resultOperation }}</span>
      </div>
      <div class="my-2 grid grid-cols-5 gap-2">
        <button
          class="p-2 border rounded shadow"
          @click="pressed(i)"
          :class="i == 'Del' || i == 'C' ? 'row-span-2 h-21' : 'w-10 h-10'"
          v-for="i in buttons"
          :key="i"
        >
          {{ i }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useWindowEvent from "../components/composition/useWindowEvent";

export default {
  setup() {
    const buttons = [
      "1",
      "2",
      "3",
      "+",
      "C",
      "4",
      "5",
      "6",
      "-",
      "7",
      "8",
      "9",
      "*",
      "Del",
      "0",
      ".",
      "=",
      "/",
    ];
    const resultOperation = ref("");
    const calculations = ["+", "-", "*", "/"];
    const deleteValue = ["Del", "C", "Delete", "Backspace"];

    const currentValue = ref("");
    const previousValue = ref("");
    const operator = ref("");
    const available = ref(false);

    function pressed(value) {
      if (value == "=" || value == "Enter") calculate();
      else if (deleteValue.includes(value)) clear(value);
      else if (calculations.includes(value)) applyOperation(value);
      else if ("1234567890.".includes(value)) appendNumber(value);
    }

    function appendNumber(value) {
      available.value = false;
      currentValue.value += value;
      if (operator.value != "") {
        resultOperation.value = `${previousValue.value} ${operator.value} ${currentValue.value}`;
        available.value = true;
      }
    }

    function applyOperation(value) {
      available.value = true;
      previousValue.value = currentValue.value;
      currentValue.value = "";
      operator.value = value;
      resultOperation.value = `${previousValue.value} ${operator.value}`;
    }

    function clear(value) {
      if (value == "C" || value == "Delete") {
        currentValue.value = "";
        previousValue.value = "";
        operator.value = "";
        resultOperation.value = "";
      } else {
        const itemData = currentValue.value.toString();
        currentValue.value = itemData.slice(0, -1);
        if (operator.value != "") {
          resultOperation.value = `${previousValue.value} ${operator.value} ${currentValue.value}`;
        }
      }
    }

    function calculate() {
      available.value = true;
      currentValue.value = eval(
        `${previousValue.value} ${operator.value} ${currentValue.value}`
      );
      operator.value = "";
      previousValue.value = "";
    }

    function handlePress(event) {
      pressed(event.key);
    }

    useWindowEvent("keydown", handlePress);

    return {
      currentValue,
      pressed,
      buttons,
      calculations,
      resultOperation,
      operator,
      available,
    };
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 0px;
  height: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgb(46, 12, 80);
}
</style>