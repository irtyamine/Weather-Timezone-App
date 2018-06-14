import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WeatherItem } from '../../weather/weather-list/weather-item';

const endpoint = 'http://api.openweathermap.org/data/2.5/weather';
const id = "985b1280f5e6b2a64f9e84ef27113358";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
	WEATHER_ITEMS: WeatherItem[] = [];

	constructor(private http: Http, private router: Router) { }

	getCurrentWeatherByLocation(lat:number, lon: number): Observable<any>{
		return this.http
		.get(`${endpoint}?lat=${lat}&lon=${lon}&appid=${id}&units=metric`)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	searchWeatherData(city:string, country: string): Observable<any>{
		return this.http
		.get(`${endpoint}?q=${city},${country}&appid=${id}&units=metric`)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}


	getWeatherItems() {
        return this.WEATHER_ITEMS;
    }

    addWeatherItem(weatherItem: WeatherItem) {
        this.WEATHER_ITEMS.push(weatherItem);
    }

	// error handler
	private handleError(error:any, caught:any): any{
		console.log(error, caught)
	}

}
