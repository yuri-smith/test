import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: CitiesComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
