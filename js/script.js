import Board from "./components/Board.js";

Vue.component("app-board", Board);

var app = new Vue({
  el: "#app",
  data() {
    return {
      message: "Hello World!",
    };
  },
});
