import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { GeocodingService } from '../geocoding/geocoding.service';
require('dotenv').config();

@Injectable()
export class WeatherService {
  private readonly API_KEY = process.env.API_KEY;

  constructor(private readonly geocodingService: GeocodingService) {}

  async getWeatherByCity(cityName: string, stateCode?: string, countryCode?: string, limit?: number) {
    try {
      // Get coordinates from the city name, state code, country code, and optional limit
      const { lat, lon } = await this.geocodingService.getCoordinates(cityName, stateCode, countryCode, limit);
      console.log(lat,lon)

      // Fetch weather data using the coordinates
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${this.API_KEY}`
      );
      console.log("response",response)
      const weatherData = response.data;

      const currentTemperature = (weatherData.current.temp - 273.15).toFixed(2) + '°C';
      const feelsLikeTemperature = (weatherData.current.feels_like - 273.15).toFixed(2) + '°C';
      const humidity = weatherData.current.humidity + '%';
      const windSpeed = (weatherData.current.wind_speed * 3.6).toFixed(2) + ' km/h';

      const dailyForecast = weatherData.daily.map(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const minTemp = (day.temp.min - 273.15).toFixed(2) + '°C';
        const maxTemp = (day.temp.max - 273.15).toFixed(2) + '°C';
        const description = day.weather[0].description;

        return `      On ${date}, the temperature will range from ${minTemp} to ${maxTemp} with ${description}.`;
      }).join('\n');

      return `
      Weather Report for ${cityName}:
      - Current Temperature: ${currentTemperature} (Feels like: ${feelsLikeTemperature})
      - Humidity: ${humidity}
      - Wind Speed: ${windSpeed}

      Daily Forecast:
      ${dailyForecast}
      `;

      // return {
      //   city: cityName,
      //   latitude: lat,
      //   longitude: lon,
      //   currentTemperature: (weatherData.current.temp - 273.15).toFixed(2) + '°C',
      //   description: weatherData.current.weather[0].description,
      //   dailyForecast: weatherData.daily.map(day => ({
      //     date: new Date(day.dt * 1000).toLocaleDateString(),
      //     temp: (day.temp.day - 273.15).toFixed(2) + '°C',
      //     description: day.weather[0].description,
      //   })),
      // };
    } catch (error) {
      throw new HttpException('Error retrieving weather data', HttpStatus.BAD_REQUEST);
    }
  }
}
