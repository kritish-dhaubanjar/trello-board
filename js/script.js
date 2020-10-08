import Board from "./components/Board.js";

Vue.component("app-board", Board);

Vue.prototype.$api = "http://localhost:8000/api/trello";

var app = new Vue({
  el: "#app",
  data() {
    return {
      message: "Hello World!",
    };
  },
});
