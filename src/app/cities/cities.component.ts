import { Component, OnInit } from '@angular/core';
import {
  City,
  ActionType,
  CitiesService
} from '../shared';
import { CommentStmt } from '@angular/compiler';

interface IWeatherbit {
  temp: number;
  ob_time: Date;
  lat: number;
  lon: number;
}

class Weatherbit {
  data: IWeatherbit[];
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  private cities: City[];
  private city: City;
  private cloneCity: City;
  private mode: ActionType = ActionType.Show;

  constructor(private service: CitiesService) { }

  ngOnInit() {
    this.getAll();
    console.log('cities', this.cities);
    console.log('action', this.mode);
  }

  getAll() {
    this.service.getAll()
      .subscribe(
        res => this.cities = res as City[],
        error => {
          console.log('Error', error);
        }
      );
    }

  cancel() {
    this.cloneCity = null;
    this.city = null;
    this.mode = ActionType.Show;
  }

  onAdd() {
    this.mode = ActionType.Add;
    this.cloneCity = new City();
  }

  save() {
    if (this.mode === ActionType.Edit) {
      this.service.edit(this.city.id, this.cloneCity)
      .subscribe(
        res => {
          this.cities[this.cities.indexOf(this.city)] = res as City;
          this.cloneCity = null;
          this.city = null;
          this.mode = ActionType.Show;
        },
        error => {
          console.log('Error, error');
        }
      );
    }

    if (this.mode === ActionType.Add) {
      this.service.add(this.cloneCity)
      .subscribe(
        res => {
          this.cities.push(res as City);
          this.cloneCity = null;
          this.city = null;
          this.mode = ActionType.Show;
        },
        error => {
          console.log('Error', error);
        }
      );
    }
  }

  delete() {
    this.service.delete(this.city.id)
    .subscribe (
      res => {
        this.cities = this.cities.filter(item => item !== this.city);
        this.cloneCity = null;
        this.city = null;
        this.mode = ActionType.Show;
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  onSelect(city: City) {
    this.city = city;
    this.cloneCity = Object.assign({}, this.city);
    // this.cloneCity = city;
    console.log('cloneCity', this.cloneCity);
    console.log('mode', this.mode.toString());
  }

  getWeatherbit() {
    this.service.getWeatherbit(this.cloneCity.name).subscribe(
      res => {
        console.log('res', res);
        const w: Weatherbit = res as Weatherbit;
        this.cloneCity.tmpr = w.data[0].temp;
        this.cloneCity.dtt = w.data[0].ob_time;
        this.cloneCity.shr = w.data[0].lat;
        this.cloneCity.dlg = w.data[0].lon;
        console.log('w', w.data[0].ob_time);
        console.log('w', w.data[0].temp);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  getDarkSky() {
    this.service.getDarkSky(222, 333).subscribe(
      res => {
        console.log('res', res);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
}
