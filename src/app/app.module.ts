import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeRoutingModule } from './home/home.routing.module';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';

import { WeatherApiService } from './api/weather/weather-api.service';
import { WeatherProfileService } from './api/weather/weather-profile.service';
import { TimezoneApiService } from './api/timezone/timezone-api.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmYO1nfXEKwBDkGBSOr-bpqyKvOFRR2N4'
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [WeatherApiService, WeatherProfileService, TimezoneApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

