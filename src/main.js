import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret, fas } from "@fortawesome/free-solid-svg-icons";

import router from "./router";
import store from "./store";

/* add icons to the library */
library.add(faUserSecret, fas);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount("#app");

