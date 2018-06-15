import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { WeatherItem } from '../../weather/weather-list/weather-item';
import { WEATHER_ITEMS } from '../../weather/weather-list/mock-weather-item';

const endpoint    = 'https://api.openweathermap.org/data/2.5/weather';
const mapEndpoint = 'https://tile.openweathermap.org/map';
const id          = "985b1280f5e6b2a64f9e84ef27113358";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
 
	constructor(private http: Http) { }

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
        return WEATHER_ITEMS;
    }

    // Add weather Item
    addWeatherItem(weatherItem: WeatherItem) {
        WEATHER_ITEMS.push(weatherItem);
    }

    // Remove selected weather item
    clearWeatherItem(index) {
        WEATHER_ITEMS.splice(WEATHER_ITEMS.indexOf(index), 1);
    }

    // Remove all weather item
    clearAllWeatherItems(){
    	WEATHER_ITEMS.splice(0);
    }

	// error handler
	private handleError(error:any, caught:any): any{
		sessionStorage.setItem('notFound', 'true');
		throw error;
	}

}
