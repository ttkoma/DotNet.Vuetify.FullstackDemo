/**
 * Api Клиент Погоды
 */
export class WeatherClient {
  /**
   * @param {import('@nuxtjs/axios').NuxtAxiosInstance} axios
   */
  constructor(axios) {
    this._axios = axios
  }

  /**
   * Получить Прогнозы погоды
   * @returns {Promise<WeatherForecastCollection>} Список прогнозов
   * @param {number} [page = 1]
   * @param {number} [pageSize= 5]
   */
  async get(page = 1, pageSize= 5) {
    const this$1 = this;
    return await this._axios
      .$get("/weatherforecast", {
        params: {
          page,
          pageSize
        },
      })
      .catch((error) => {
        if (this$1._axios.isCancel(error)) {
          // eslint-disable-next-line no-console
          console.warn("Request canceled", error)
        }
        else if (error.isAxiosError) {
          throw new Error(error.message)
        } else {
          throw error;
        }
      })
  }
}
