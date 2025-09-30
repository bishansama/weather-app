import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.openWeatherMapApiKey;
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Observable<WeatherData> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherData>(url);
  }

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
