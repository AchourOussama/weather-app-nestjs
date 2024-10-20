import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    @Query('city') city: string,
    @Query('state') state?: string,
    @Query('country') country?: string,
    @Query('limit') limit?: number
  ) {
    return this.weatherService.getWeatherByCity(city, state, country, limit);
  }
}
