import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Forecast, Main, Weather, Wind } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  resultado: Forecast = {};
  temperatura: Main = {};
  weatherDesc: Weather = {};
  viento: Wind = {};
  weatherImage: any;

  lat: string;
  lon: string;

  constructor(
    private weather: WeatherService,
    private geolocation: Geolocation
  ) {}

  async ngOnInit() {
    const location = await this.geolocation.getCurrentPosition().then(
      pos => {
        this.lat = pos.coords.latitude.toString();
        this.lon = pos.coords.longitude.toString();
      }
    ).catch(
      err => console.log(err)
    );

    this.weather.getForecastNow(this.lat, this.lon).subscribe(
      (resp: Forecast) => {
        this.resultado = resp;
        this.temperatura = resp.main;
        this.weatherDesc = resp.weather[0];
        this.weatherImage = 'assets/icon/weather/'+resp.weather[0].icon+'.png';
        this.viento = resp.wind;
      },
      error => {
        console.log("error => ", error);
      }
    );
  }
  
}
