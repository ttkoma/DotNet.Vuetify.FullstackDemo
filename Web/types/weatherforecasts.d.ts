// Коллекция данных с общим количеством записей на сервере
export interface CollectionResponse<T> {
  // Коллекция объектов
  data: Array<T>;
  // Общее количество объектов на сервер
  totalCount: number;
}

// Модель прогноза погоды
export interface WeatherForecast {
  // an Date
  date: Date;
  // Temperature Celsius.
  temperatureC: number;
  // Temperature Fahrenheit.
  temperatureF: number;
  // Summary.
  summary: string;
}

// Коллекция Прогнозов погоды
export type WeatherForecastCollection = CollectionResponse<WeatherForecast>
