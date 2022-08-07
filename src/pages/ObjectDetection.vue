<template>
  <section class="flex w-full">
    <div class="m-auto">
      <div class="mt-10">
        <h1 class="text-2xl font-bold text-center">Object Detection</h1>

        <button
          class="
            mt-auto
            px-4
            py-2
            bg-blue-500
            border
            rounded-lg
            shadow-lg
            w-full
          "
          @click="openCamera"
          v-if="!isVideo"
        >
          Open Camera
        </button>
        <div class="w-full flex justify-between" v-if="isVideo">
          <button
            class="
              mt-auto
              px-4
              py-2
              bg-blue-500
              border
              rounded-lg
              shadow-lg
              w-1/2
            "
            @click="closeCamera"
          >
            Close Video
          </button>
          <button
            class="
              mt-auto
              px-4
              py-2
              bg-blue-500
              border
              rounded-lg
              shadow-lg
              w-1/2
            "
            @click="takeSnapshot"
          >
            take snapshot
          </button>
        </div>
        <div v-if="isVideo">
          <video
            width="400"
            height="400"
            autoplay="true"
            ref="videoRef"
            class="my-5 border"
          />
        </div>
        <img
          ref="imgRef"
          src="https://images.unsplash.com/photo-1567581935884-3349723552ca"
          width="400"
          height="400"
          crossorigin="anonymous"
        />

        <div class="w-full m-auto text-center py-2" v-if="isLoading">
          Loading...⏳
        </div>

        <div
          class="w-full mt-2 px-4 py-2 text-center text-2xl"
          v-if="result[0] && !isLoading"
        >
          {{ result[0].class }}
        </div>

        <button
          class="
            mt-auto
            px-4
            py-2
            bg-blue-500
            border
            rounded-lg
            shadow-lg
            w-full
          "
          @click="detectObject"
        >
          Detect Object
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");

export default {
  setup() {
    const imgRef = ref("");
    const isLoading = ref(false);
    const result = ref([]);
    const videoRef = ref("");
    const isVideo = ref(false);

    async function detectObject() {
      isLoading.value = true;
      const img = imgRef.value;
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      result.value = predictions;
      isLoading.value = false;
    }

    async function openCamera() {
      if (navigator.mediaDevices.getUserMedia) {
        isVideo.value = true;
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          videoRef.value.srcObject = stream;
        });
      }
    }

    function closeCamera() {
      const stream = videoRef.value.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      }),
        (isVideo.value = false);
    }

    async function takeSnapshot() {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.value.videoWidth;
      canvas.height = videoRef.value.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.value, 0, 0);
      imgRef.value.setAttribute("src", canvas.toDataURL("image/png"));
    }

    return {
      imgRef,
      result,
      detectObject,
      isLoading,
      videoRef,
      openCamera,
      isVideo,
      closeCamera,
      takeSnapshot,
    };
  },
};
</script>

<style>
</style>