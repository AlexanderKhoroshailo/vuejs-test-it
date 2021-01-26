import * as fb from "firebase";
import Vue from "vue";
import App from "./App.vue";
import BuyModalComponent from "./components/Shared/BuyModal"
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.component("app-buy-modal",BuyModalComponent)

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyDATNyi4_ip_7Yy1IhPaWj25601XuK9kU4",
      authDomain: "vuejs-test-it.firebaseapp.com",
      databaseURL: "https://vuejs-test-it.firebaseio.com",
      projectId: "vuejs-test-it",
      storageBucket: "vuejs-test-it.appspot.com",
      messagingSenderId: "366812211612",
      appId: "1:366812211612:web:8bc8062b6e03fb018e8059",
    });
    fb.auth().onAuthStateChanged((user) => {
      if (user) this.$store.dispatch("autoLoginUser", user);
    });
    this.$store.dispatch("fetchAds");


  },
}).$mount("#app");
