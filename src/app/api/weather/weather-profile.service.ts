import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { WeatherProfileItem } from '../../weather/weather-profile/weather-profile-item';
import { WEATHER_PROFILES } from '../../weather/weather-profile/mock-weather-profile';

@Injectable({
  	providedIn: 'root'
})
export class WeatherProfileService {
    constructor() { }

  	saveNewProfile(address: string[], profileName: string): Observable<any>{
  		const profile = new WeatherProfileItem(profileName, address);
  		WEATHER_PROFILES.push(profile);
  		return null;
  	}

  	getProfiles = (): any[] => WEATHER_PROFILES;

  	deleteProfile(profile: WeatherProfileItem): Observable<any>{
  		WEATHER_PROFILES.splice(WEATHER_PROFILES.indexOf(profile), 1);
  		console.log(WEATHER_PROFILES);
  		return null;
  	}

  	
}
