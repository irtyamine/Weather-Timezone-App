import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WeatherListComponent } from '../weather/weather-list/weather-list.component';
import { WeatherMapComponent } from '../weather/weather-map/weather-map.component';
import { WeatherProfileComponent } from '../weather/weather-profile/weather-profile.component';
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
    WeatherMapComponent,
    WeatherProfileComponent,
    SidebarComponent
  ],
  providers: []
})

export class HomeRoutingModule { }