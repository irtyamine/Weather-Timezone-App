import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { WeatherItem } from '../../weather/weather-list/weather-item';
import { WEATHER_ITEMS } from '../../weather/weather-list/mock-weather-item';

const endpoint = 'https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyDmYO1nfXEKwBDkGBSOr-bpqyKvOFRR2N4';

@Injectable({
	providedIn: 'root'
})
export class TimezoneApiService {

	constructor(private http: Http) { }

	// Get weather data by geolocation
	getCurrentTimeByLocation(): Observable<any>{
		return this.http
		.get(`${endpoint}`)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	// error handler
	private handleError(error:any, caught:any): any{
		sessionStorage.setItem('notFound', 'true');
		throw error;
	}
}
