import { Component, OnInit } from '@angular/core';
import {
  City,
  User,
  ActionType,
  CitiesService,
  UsersService
} from '../shared';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: User[];
  private user: User;
  private cloneUser: User;
  private cities: City[];
  private city: City;
  private cityName: string;
  private mode: ActionType = ActionType.Show;

  constructor(
    private citiesService: CitiesService,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    this.getAll();
    this.getSities();
    this.mode = ActionType.Show;
  }

  getAll() {
    this.usersService.getAllWithCities()
      .subscribe(
        res => this.users = res as User[],
        error => {
          console.log('Error', error);
        }
      );
  }

  getSities() {
    this.citiesService.getAll()
    .subscribe(
      res => this.cities = res as City[],
      error => {
        console.log('Error', error);
      }
    );
  }

  cancel() {
    this.cloneUser = null;
    this.user = null;
    this.city = null;
    this.cityName = null;
    this.mode = ActionType.Show;
  }

  onAdd() {
    this.mode = ActionType.Add;
    this.cloneUser = new User();
  }

  save() {
    if (this.mode === ActionType.Edit) {
      console.log('cityName_после', this.cityName);
      console.log('id newCity', this.cities.find(x => x.name === this.cityName).id);
      this.usersService.edit(this.user.id, {
        name: this.cloneUser.name,
        cityId: this.cities.find(x => x.name === this.cityName).id,
        email: this.cloneUser.email
      })
      .subscribe(
        res => {
          const _user: User = res as User;
          this.usersService.getOneWithCity(_user.id).subscribe(
            rez => {
              console.log('rez после редактирования из базы', rez);
              this.users[this.users.indexOf(this.user)] = rez as User;
            },
            error => {
              console.log('Error, error');
            }
          );
          this.cloneUser = null;
          this.user = null;
          this.city = null;
          this.cityName = null;
          this.mode = ActionType.Show;
        },
        error => {
          console.log('Error, error');
        }
      );
    }

    if (this.mode === ActionType.Add) {
      this.usersService.add({
        name: this.cloneUser.name,
        cityId: this.city.id,
        email: this.cloneUser.email
      })
      .subscribe(
        res => {
          const _user: User = res as User;
          this.usersService.getOneWithCity(_user.id).subscribe(
            rez => {
              this.users.push(rez as User);
            },
            error => {
              console.log('Error', error);
            }
          );
          this.cloneUser = null;
          this.user = null;
          this.city = null;
          this.cityName = null;
          this.mode = ActionType.Show;
        },
        error => {
          console.log('Error', error);
        }
      );
    }
  }

  delete() {
    this.usersService.delete(this.user.id)
    .subscribe (
      res => {
        this.users = this.users.filter(item => item !== this.user);
        this.cloneUser = null;
        this.user = null;
        this.city = null;
        this.cityName = null;
        this.mode = ActionType.Show;
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  onSelect(user: User) {
    console.log('users', this.users);
    this.user = user;
    this.city = this.cities.find(x => x.id === user.cityId);
    this.cityName = this.city.name;
    console.log('cityName_до', this.cityName);
    this.cloneUser = Object.assign({}, this.user);
    console.log('city', this.city);
  }

}
