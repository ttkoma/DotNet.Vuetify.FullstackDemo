<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.9,
    }"
    min-height="200"
    transition="fade-transition"
    class="success"
  >
    <v-btn color="success" @click="fetchItems">Показать ещё</v-btn>
  </v-lazy>
</template>

<script>
export default {
  name: "Fetcher",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Array,
      default: undefined,
    },
    fetching: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false,
      items: this.value ?? [],
      isFetching: this.$props.fetching,
    }
  },
  watch: {
    isActive(value) {
      console.log("Active toggled:", value)
      if (value) {
        this.fetchItems()
        this.$nextTick(() => {
          // this.isActive = false
        })
      }
    },
    isFetching(value) {
      this.$emit("update:fetching", value)
    }
  },
  methods: {
    fetchItems() {
      this.isFetching = true
      this.items =[]
      this.$api.weather
        .get()
        .then((result) => {
          this.items = this.items.concat(result)
          this.$emit("change", this.items)
        })
        .finally(() => (this.isFetching = false))
    },
  },
}
</script>

<style scoped></style>
