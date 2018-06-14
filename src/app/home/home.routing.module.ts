import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { WeatherListComponent } from '../weather/weather-list/weather-list.component';
import { WeatherMapComponent } from '../weather/weather-map/weather-map.component';
import { HomeComponent } from './home.component';

import { AgmCoreModule } from '@agm/core';

const homeRoute: Routes = [
  	{ path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule,
  	RouterModule.forRoot(homeRoute)
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    WeatherListComponent,
    WeatherMapComponent
  ],
  providers: []
})

export class HomeRoutingModule { }