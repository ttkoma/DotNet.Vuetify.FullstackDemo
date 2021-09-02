<template>
  <v-responsive class="overflow-y-auto">
    <v-item-group>
      <v-item v-for="(item, i) in forecasts" :key="i">
        <v-col cols="12">
          <WeatherCard :item="item" :scroll-to-top="i % 5 === 0" />
        </v-col>
      </v-item>
      <v-col cols="12" class="text-center">
        <v-alert
          v-if="error"
          color="red"
          dark
          transition="scale-transition"
          class="text-left"
        >
          <h3>Ошибка</h3>
          <div>{{ error }}</div>
          <v-divider
            class="my-4 white"
            style="opacity: 0.22"
          ></v-divider>
          <div class="text-right">
            <v-btn outlined @click="loadPage(pageLoaded + 1)">Повторить</v-btn>
          </div>
        </v-alert>
        <div
          v-if="moreDataToAvailable && !loading && !error"
          v-intersect="{
            handler: loadNextPage,
            options: {
              threshold: 1,
            },
          }"
          style="height: 100px"
        >
          <v-btn
            v-show="pageLoaded > 0"
            color="info darken-2"
            blokc
            outlined
            @click="loadPage(pageLoaded + 1)"
            >Показать ещё
          </v-btn>
        </div>
        <v-progress-circular
          v-if="loading"
          color="indigo darken-2"
          indeterminate
          size="36"
        >
        </v-progress-circular>
      </v-col>
    </v-item-group>
  </v-responsive>
</template>

<script>
import WeatherCard from "~/components/Weather/WeatherCard"

export default {
  name: "PageWeather",
  components: { WeatherCard },
  data() {
    return {
      /**
       * Список прогнозов погоды
       * @type {WeatherForecast[]}
       */
      forecasts: [],
      loading: false,
      pageLoaded: 0,
      pageSize: 5,
      totalCount: 0, // fetch from API,
      error: undefined
    }
  },
  computed: {
    /**
     *
     * @return {boolean}
     */
    moreDataToAvailable() {
      if (this.pageLoaded === 0) return true

      return Math.ceil(this.totalCount / this.pageSize) - 1 > this.pageLoaded
    },
  },
  methods: {
    /**
     * @param {IntersectionObserverEntry[]} entries
     * @return {Promise<void>}
     */
    async loadNextPage(entries) {
      if (entries[0].isIntersecting && this.moreDataToAvailable && !this.error) {
        const nextPage = this.pageLoaded + 1
        await this.loadPage(nextPage) // API call
      }
    },
    /**
     *
     * @param pageNumber
     * @return {Promise<boolean>}
     */
    loadPage(pageNumber) {
      this.loading = true
      this.error = undefined

      return this.$api.weather
        .get(pageNumber)
        .then((c) => {
          this.forecasts = this.forecasts.concat(c.data)
          this.totalCount = c.totalCount
          this.pageLoaded = pageNumber
        })
        .catch((er) => {
          this.error = er.message
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>

<style scoped></style>
