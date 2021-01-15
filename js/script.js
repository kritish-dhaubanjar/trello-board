import Board from "./components/Board.js";

Vue.component("app-board", Board);

Vue.prototype.$api = "https://kanban-board-37639-default-rtdb.firebaseio.com/";

var app = new Vue({
  el: "#app",
  data() {
    return {
      message: "Hello World!",
    };
  },
});
