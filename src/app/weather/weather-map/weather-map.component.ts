import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../../api/weather/weather-api.service';

@Component({
	selector: 'weather-map',
	templateUrl: './weather-map.component.html',
	styleUrls: ['./weather-map.component.scss'],
	providers: []
})
export class WeatherMapComponent implements OnInit {
	private req : any;
	lat: number = 40.730610;
    lng: number =- 73.935242;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private weatherApiService: WeatherApiService) { }

	ngOnInit() {
		this.getLocation();
	}

	// Get your current location
	getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition((
	        //Set longitude and latitude
	        position => {
	        	this.lat = position.coords.latitude;
	        	this.lng = position.coords.longitude;
	        }), this.showGeolocationError);
	    } else { 
	        console.log("Geolocation is not supported by this browser.");
	    }
	}

	// Geolocation error
	showGeolocationError(error){
		switch(error.code) {
	        case error.PERMISSION_DENIED:
	            console.log("User denied the request for Geolocation.")
	            break;
	        case error.POSITION_UNAVAILABLE:
	        	console.log("Location information is unavailable.")
	            break;
	        case error.TIMEOUT:
	        	console.log("The request to get user location timed out.")
	            break;
	    }
	}

	ngOnDestroy(){
		if(this.req) this.req.unsubscribe();
	}
}
