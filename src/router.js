import { createRouter, createWebHistory } from "vue-router";
import AppCalender from "./pages/AppCalender.vue";
import DcHeroes from "./pages/DcHeroes.vue";
import HomePage from "./pages/HomePage.vue";
import MarkDown from "./pages/MarkDown";
import Carousel from "./pages/CarousalApp.vue";
import Calculator from "./pages/CalculatorApp.vue";
import reusableModal from "./pages/reusableModal.vue";
import ChatSystem from "./pages/ChatSystem.vue";
import store from "./store";
import UserCRUD from "./pages/UserCRUD.vue";
import ObjectDetection from "./pages/ObjectDetection.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/dc-heroes", component: DcHeroes },
  { path: "/calender", component: AppCalender },
  { path: "/markdown", component: MarkDown },
  { path: "/slider", component: Carousel },
  { path: "/calculator", component: Calculator },
  { path: "/crud-app", component: UserCRUD },
  { path: "/tensorflow", component: ObjectDetection },
  { path: "/reusable-modal", component: reusableModal },
  {
    path: "/chat",
    component: ChatSystem,
    meta: { middleware: "auth" },
  },
];

let router = new createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = require(`./middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(next, store);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
