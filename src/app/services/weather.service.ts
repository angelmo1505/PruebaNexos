import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiKey = '';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = "5ba11590414822ad4566ca1a63fba663";

  constructor(
    private http: HttpClient
  ) { }

  public getForecastNow<Forecast>(lat: string, lon: string) {
    const query = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sp&units=metric&appid=${this.apiKey}`;
    return this.http.get<Forecast>(query);
  }

}
