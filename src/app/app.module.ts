import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import {DataTableModule} from 'angular-6-datatable';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { CitiesModule } from './cities/cities.module';
import { UsersModule } from './users/users.module';
import { NotFoundComponent } from './not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    DataTableModule,
    AppRoutingModule,
    CitiesModule,
    UsersModule
  ],
  // providers: [
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
