import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WeatherItem } from '../../weather/weather-list/weather-item';

const endpoint    = 'http://api.openweathermap.org/data/2.5/weather';
const mapEndpoint = 'https://tile.openweathermap.org/map';
const id          = "985b1280f5e6b2a64f9e84ef27113358";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
	WEATHER_ITEMS: WeatherItem[] = [];
 
	constructor(private http: Http, private router: Router) { }

	// Get weather data by geolocation
	getCurrentWeatherByLocation(lat:number, lon: number): Observable<any>{
		return this.http
		.get(`${endpoint}?lat=${lat}&lon=${lon}&appid=${id}&units=metric`)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	// Search weather data by city and country
	searchWeatherData(search): Observable<any>{
		return this.http
		.get(`${endpoint}?q=${search}&appid=${id}&units=metric`)
		.pipe(
			map(res => { 
				sessionStorage.setItem('notFound', 'false');
				return res.json();
			}),
			catchError(this.handleError)
		);
	}

	// Get list of weather items
	getWeatherItems() {
        return this.WEATHER_ITEMS;
    }

    // Add weather Item
    addWeatherItem(weatherItem: WeatherItem) {
        this.WEATHER_ITEMS.push(weatherItem);
    }

    // Remove selected weather item
    clearWeatherItems(index) {
        this.WEATHER_ITEMS.splice(this.WEATHER_ITEMS.indexOf(index), 1);
    }

	// error handler
	private handleError(error:any, caught:any): any{
		sessionStorage.setItem('notFound', 'true');
		throw error;
	}

}
