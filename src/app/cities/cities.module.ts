import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { CitiesComponent } from './cities.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule
],
  declarations: [CitiesComponent]
})
export class CitiesModule { }
