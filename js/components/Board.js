export default {
  template: `
    <div class="container-fluid">
      <div class="row pt-4">
        <!-- -->

        <div class="col px-1" v-for="(type,index) in types" :key="index">
          <div class="card">
            <div class="card-header font-weight-bold pb-2">{{type.name}}</div>
            <div class="card-body px-2 pt-0 pb-0 parent">
              <div
                class="card mb-2 child"
                v-for="(child, index) in type.childs"
                draggable="true"
                @click="show(child)"
              >
                <div class="card-body py-2">
                  <!--<span class="badge badge-primary">Minor Bug</span>-->
                  <p class="mb-0">{{child}}</p>
                </div>
              </div>
            </div>
            <div class="card-body p-2 actions" v-if="card.active != type.slug">
              <button
                class="btn btn-light btn-block"
                @click="card.active = type.slug"
              >
                + Add another card
              </button>
            </div>
            <div class="card-body p-2 actions" v-else>
              <textarea
                class="form-control mb-1"
                rows="2"
                v-model="card.value"
              ></textarea>
              <button
                class="btn btn-success"
                :disabled="card.value.length==0"
                @click="add(index)"
              >
                Add Card
              </button>
              <span aria-hidden="true" class="close" @click="reset"
                >&times;</span
              >
            </div>
          </div>
        </div>

        <!-- -->

        <div class="col px-1">
          <div class="card add-another-list">
            <button
              class="btn btn-dark translucent btn-block"
              v-if="!addAnotherList.toggle"
              @click="addAnotherList.toggle = true"
            >
              + Add another list
            </button>
            <div class="card-body p-2 actions" v-else>
              <textarea
                class="form-control mb-2"
                rows="1"
                placeholder="Enter list title..."
                v-model="addAnotherList.value"
              ></textarea>
              <button
                class="btn btn-success"
                :disabled="addAnotherList.value.length==0"
                @click="addAnotherListToTypes"
              >
                Add Card
              </button>
              <span
                aria-hidden="true"
                class="close"
                @click="addAnotherList.toggle = false"
                >&times;</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- textarea -->
      <textarea id="clipboard" class="position-fixed"></textarea>

      <div id="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="mr-auto">Copied to clipboard!</strong>
        </div>
      </div>
    </div>
  `,

  data() {
    return {
      card: {
        active: "",
        value: "",
      },
      addAnotherList: {
        toggle: false,
        value: "",
      },
      types: [
        {
          name: "Backlog",
          slug: "backlog",
          childs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Curabitur congue massa ac pellentesque interdum.",
            "Morbi ac orci sed ex elementum scelerisque non eget nulla.",
            "Duis rutrum sapien at elit consequat, quis porttitor nulla venenatis.",
            "Praesent id nisl id odio ornare auctor in eu nisi.",
          ],
        },
        {
          name: "Design",
          slug: "design",
          childs: [],
        },
        {
          name: "Todo",
          slug: "todo",
          childs: [],
        },
        {
          name: "Issues & Enhancement",
          slug: "issues_enhancement",
          childs: [
            "Suspendisse sit amet leo ut elit fringilla rutrum.",
            "Vivamus quis ligula sagittis, imperdiet mauris vel, auctor nisi.",
            "Quisque eu orci vitae ex blandit lacinia.",
            "Donec non lorem commodo, molestie risus ultrices, vehicula quam.",
            "Ut ac ex eget velit dignissim aliquam.",
            "Cras volutpat ipsum rhoncus tellus blandit suscipit a eu lectus.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          ],
        },
        {
          name: "Doing",
          slug: "doing",
          childs: [],
        },
        {
          name: "Testing",
          slug: "testing",
          childs: [],
        },
        {
          name: "Done",
          slug: "done",
          childs: [
            "Morbi ornare odio id hendrerit placerat.",
            "Etiam a massa non sem sagittis tempor eget ut dolor.",
            "Donec commodo sem euismod risus eleifend luctus.",
            "Etiam pretium odio at ligula placerat, id faucibus libero aliquam.",
            "Aliquam eu quam sit amet mauris cursus molestie.",
            "Mauris porttitor magna eget scelerisque fringilla.",
            "Mauris a sapien sit amet nisi dapibus feugiat.",
            "Proin imperdiet nibh non nibh fringilla, vel fermentum augue pulvinar.",
          ],
        },
      ],
    };
  },

  mounted() {
    this.addEventListener();
  },

  methods: {
    add(index) {
      this.types[index].childs.push(this.card.value);
      setTimeout(() => {
        this.addEventListener();
      }, 0);
      this.reset();
    },

    reset() {
      this.card.value = "";
      this.card.active = "";
    },

    show(card) {
      let textarea = document.getElementById("clipboard");
      textarea.innerText = card;
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      document.execCommand("copy");
      $("#toast").toast("show");
    },

    addAnotherListToTypes() {
      let slug = "";
      let index = -1;
      do {
        index = -1;
        slug =
          this.addAnotherList.value.toLocaleLowerCase().replaceAll(" ", "_") +
          "_" +
          Math.floor(Math.random() * 99999);
        index = this.types.findIndex((type) => type.slug == slug);
      } while (index > 0);
      this.types.push({
        name: this.addAnotherList.value,
        slug,
        childs: [],
      });
      this.addAnotherList.value = "";
      this.addAnotherList.toggle = false;
      setTimeout(() => {
        this.addEventListener();
      }, 0);
    },

    addEventListener() {
      const draggables = document.querySelectorAll(".child");
      const containers = document.querySelectorAll(".parent");

      draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", () =>
          draggable.classList.add("active")
        );

        draggable.addEventListener("dragend", () =>
          draggable.classList.remove("active")
        );
      });

      containers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
          e.preventDefault();
          const afterElement = this.getDragAfterElement(container, e.clientY);
          const draggable = document.querySelector(".active");
          if (!afterElement) container.appendChild(draggable);
          else container.insertBefore(draggable, afterElement);
        });
      });
    },

    getDragAfterElement(container, clientY) {
      const draggables = [...container.querySelectorAll(".child:not(.active)")];

      return draggables.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = clientY - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset)
            return { offset: offset, element: child };
          else return closest;
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    },
  },

  watch: {
    "card.active": function () {
      this.card.value = "";
    },
  },
};
