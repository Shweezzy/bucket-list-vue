<template>
  <div id="app">
    <h1 class="subtitle has-text-centered">Shweezzy Bucket List:</h1>
    <hr />
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          class="input"
          type="text"
          placeholder="steal a million dollars.... for example"
          v-model="description"
        />
      </div>
      <div class="control">
        <a class="button is-info" @click="addItem" :aria-disabled="!description"
          >Add to list</a
        >
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input
          class="column input"
          v-if="isSelected(item)"
          v-model="editedDesc"
        />
        <p v-else class="column">
          <span class="tag is-primary"> {{ i + 1 }}</span>
          {{ item.description }}
        </p>
        <div class="column is-narrow second">
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ? unselect() : select(item)"
          >
            <i class="material-icons">{{
              isSelected(item) ? "close" : "edit"
            }}</i>
          </span>
          <span
            class="icon has-text-info"
            @click="
              isSelected(item) ? updateItem(item, i) : removeItem(item, i)
            "
          >
            <i class="material-icons">{{
              isSelected(item) ? "send" : "delete_sweep"
            }}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data() {
    return {
      items: [],
      description: "",
      editedDesc: "",
      selected: {},
    };
  },
  async mounted() {
    const response = await axios.get("api/bucketListItems/");
    this.items = response.data;
  },
  methods: {
    async addItem() {
      const response = await axios.post("api/bucketListItems/", {
        description: this.description,
      });

      this.items.push(response.data);

      this.description = "";
    },
    async removeItem(item, i) {
      await axios.delete("api/bucketListItems/" + item._id);

      this.items.splice(i, 1);
    },
    async select(item) {
      this.selected = item;

      this.editedDesc = item.description;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedDesc = "";
    },
    async updateItem(item, i) {
      const response = await axios.put("api/bucketListItems/" + item._id, {
        description: this.editedDesc,
      });
      this.items[i] = response.data;
      this.unselect();
    },
  },
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
.columns {
  display: flex;
}
.second {
  flex: none;
}
</style>
