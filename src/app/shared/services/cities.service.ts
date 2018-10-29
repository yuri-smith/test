import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3004/cities');
  }

  getOne(id: number) {
    return this.httpClient.get('http://localhost:3004/cities/' + id);
  }

  add(city: City) {
    return this.httpClient.post('http://localhost:3004/cities', city );
  }

  edit(id: number, city: City) {
    return this.httpClient.put('http://localhost:3004/cities/' + id, city );
  }

  delete(id: number) {
    return this.httpClient.delete('http://localhost:3004/cities/' + id);
  }

  getWeatherbit(cityName: string) {
    return this.httpClient.get('https://api.weatherbit.io/v2.0/current?city=' + cityName + '&key=58c2500edd1b4308aa4bf5063a7fcb03');
  }

  getDarkSky(lat, lon: number) {
    return this.httpClient.get(
      'https://api.darksky.net/forecast/a3f13c1314c1c3bbc71133199697a8f2/42.3601,-71.0589?exclude=minutely,hourly,daily,alerts,flags'
    );
  }
}
