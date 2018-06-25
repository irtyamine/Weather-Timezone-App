import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, from, of, range, empty } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { TimezoneItem } from '../../timezone/timezone-list/timezone-item';
import { TIMEZONE_ITEMS } from '../../timezone/timezone-list/mock-timezone-item';

const endpoint = 'https://timezoneapi.io/api';

@Injectable({
	providedIn: 'root'
})
export class TimezoneApiService {

	constructor(private http: Http) { }

	// Get timezone data by ipaddress
	getCurrentTimeByLocation(): Observable<any>{
		return this.http
		.get(`${endpoint}/ip`)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	// Search timezone data by city and country
	searchTimezoneData(search): Observable<any>{
		return this.http
		.get(`${endpoint}/address/?${search}`)
		.pipe(
			map(res => { 
				sessionStorage.setItem('notFound', 'false');
				return res.json();
			}),
			catchError(this.handleError)
		);
	}

	// Get list of timezone items
	getTimezoneItems() {
        return TIMEZONE_ITEMS;
    }

    // Add timezone Item
    addTimezoneItem(timezoneItem: TimezoneItem) {
        TIMEZONE_ITEMS.push(timezoneItem);
    }

     // Remove selected timezone item
    clearTimezoneItem(index) {
        TIMEZONE_ITEMS.splice(TIMEZONE_ITEMS.indexOf(index), 1);
    }

    // Remove all timezone item
    clearAllTimezoneItems(){
    	TIMEZONE_ITEMS.splice(0);
    }

	// error handler
	private handleError(error:any, caught:any): any{
		sessionStorage.setItem('notFound', 'true');
		throw error;
	}
}
