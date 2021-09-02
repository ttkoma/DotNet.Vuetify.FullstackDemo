import Vue from "vue"
import { WeatherClient } from "~/api/weatherClient"

/**
 * Nuxt плагин
 * @param {import('@nuxtjs/axios').NuxtAxiosInstance} $axios
 * @param {import('@nuxt/types/app').Inject } inject
 * @type {import('@nuxt/types').Plugin}
 */
const plugin = ({$axios}, inject) => {

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)

    if (isNaN(code)) {
      throw new TypeError("Сервер не доступен");
    }

    switch (code) {
      case 504:
        throw new Error("Сервер не ответил на запрос за отведённое время. Код ошибки: 504.")
      default:
        throw new Error(error.message)
    }
  })

  const api = {
    /**
     * @type {WeatherClient}
     * Api Клиент Погоды
     */
    weather: new WeatherClient($axios),
  }

  Vue.prototype.$api = api

  inject("api", api)
}

export default plugin
