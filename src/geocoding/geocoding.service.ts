import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
require('dotenv').config();

@Injectable()
export class GeocodingService {
  private readonly API_KEY = process.env.API_KEY;

  async getCoordinates(cityName: string, stateCode?: string, countryCode?: string, limit: number = 1) {
    try {
      // Construct the query parameters based on provided inputs
      let query = cityName;
      if (stateCode) query += `,${stateCode}`;
      if (countryCode) query += `,${countryCode}`;

      // Call the API with the constructed query and optional limit
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${this.API_KEY}`
      );

      const data = response.data;

      if (!data.length) {
        throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
      }
      
      const  lat = data[0]["lat"];
      const lon = data[0]["lon"];
      return { lat, lon };
    } catch (error) {
      throw new HttpException('Error retrieving coordinates', HttpStatus.BAD_REQUEST);
    }
  }
}
