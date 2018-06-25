import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { TimezoneProfileItem } from '../../timezone/timezone-profile/timezone-profile-item';
import { TIMEZONE_PROFILES } from '../../timezone/timezone-profile/mock-timezone-profile';

@Injectable({
  providedIn: 'root'
})
export class TimezoneProfileService {

  constructor() { }

  saveNewProfile(address: string[], profileName: string): Observable<any>{
  	const profile = new TimezoneProfileItem(profileName, address);
  	TIMEZONE_PROFILES.push(profile);
  	return null;
  }

  getProfiles = (): any[] => TIMEZONE_PROFILES;

  deleteProfile(profile: TimezoneProfileItem): Observable<any>{
  	TIMEZONE_PROFILES.splice(TIMEZONE_PROFILES.indexOf(profile), 1);
  	console.log(TIMEZONE_PROFILES);
  	return null;
  }
}
