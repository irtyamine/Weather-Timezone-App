import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { WeatherListComponent } from '../weather/weather-list/weather-list.component';
import { HomeComponent } from './home.component';

const homeRoute: Routes = [
  	{ path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    SharedModule,
  	RouterModule.forRoot(homeRoute)
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    WeatherListComponent
  ],
  providers: []
})

export class HomeRoutingModule { }