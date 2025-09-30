import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  city: string = '';
  weatherData: WeatherData | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    if (!this.city.trim()) {
      this.error = 'Please enter a city name';
      return;
    }

    this.loading = true;
    this.error = '';
    this.weatherData = null;

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'City not found or API error. Please try again.';
        this.loading = false;
        console.error('Weather API error:', err);
      }
    });
  }

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }

  getTemperature(): number {
    return this.weatherData ? Math.round(this.weatherData.main.temp) : 0;
  }

  getFeelsLike(): number {
    return this.weatherData ? Math.round(this.weatherData.main.feels_like) : 0;
  }
}
