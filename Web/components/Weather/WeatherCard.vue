<template>
  <v-card ref="target" min-height="150" :class="cardClass" shaped class="highlight blue-grey--text text--darken-2">
    <v-card-title>
      <DateFormatter :value="item.date">
        <template #default="props">{{ props.time }}</template>
      </DateFormatter>
    </v-card-title>
    <v-card-text class="d-flex">
      Temperature:
      <v-spacer />
      <span
        class="font-weight-medium"
        :class="{
          'red--text text--darken-2': item.temperatureC > 0,
          'info--text text--darken-2': item.temperatureC <= 0,
        }"
      >
        {{ item.temperatureC }} °C / {{ item.temperatureF }} °F
      </span>
    </v-card-text>
    <v-card-text>
      {{ item.summary }}
    </v-card-text>
  </v-card>
</template>

<script>
import DateFormatter from "~/components/DateFormatter"

export default {
  name: "WeatherCard",
  components: { DateFormatter },
  props: {
    /**
     * @type {WeatherForecast} Weather forecast model
     */
    item: {
      type: Object,
      default: () => undefined,
    },
    scrollToTop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      highlight: true,
    }
  },
  computed: {
    cardClass() {
      return {
        "indigo lighten-3": this.highlight,
      }
    },
  },
  mounted() {
    if (this.scrollToTop) {
      this.$vuetify.goTo(this.$refs.target, {
        duration: 350,
        offset: 24,
        easing: "easeInOutCubic",
      })
    }

    setTimeout(() => {
      this.highlight = false
    }, 100)
  },
}
</script>

<style scoped>
.highlight {
  transition: background 1.2s ease-in-out;
}
</style>
