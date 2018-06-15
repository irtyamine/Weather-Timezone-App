import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { WeatherProfileItem } from '../../weather/weather-profile/weather-profile-item';

@Injectable({
  	providedIn: 'root'
})
export class WeatherProfileService {
	  private profiles: WeatherProfileItem[] = [
        new WeatherProfileItem('Default Profile', ['Manila, PH', 'New York, USA', 'Berlin, Germany']),
        new WeatherProfileItem('Profile 2', ['London', 'Hawaii', 'Makati'])
    ];

  	saveNewProfile(address: string[]): Observable<any>{
  		const profileName = `Profiles: ${this.profiles.length}`;
  		const profile = new WeatherProfileItem(profileName, address);

  		this.profiles.push(profile);
  		return null;
  	}

  	getProfiles = (): any[] => this.profiles;

  	deleteProfile(profile: WeatherProfileItem): Observable<any>{
  		this.profiles = this.profiles.splice(this.profiles.indexOf(profile), 1);
  		console.log(this.profiles);
  		return null;
  	}

  	
}
