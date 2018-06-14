import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../../api/weather/weather-api.service';
import { WeatherItem } from "./weather-item";

@Component({
	selector: 'weather-list',
	templateUrl: './weather-list.component.html',
	styleUrls: ['./weather-list.component.scss'],
	providers: [WeatherApiService]
})
export class WeatherListComponent implements OnInit {
	private req : any;
	items       : any;
	notFound    : any = null;
	input       : IWeatherInput;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private weatherApiService: WeatherApiService) {  this.input = <IWeatherInput>{} }

	ngOnInit() {
		this.getLocation();	
	}

	// Get your current location
	getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition((
	        //Set longitude and latitude
	        position => {
	        	this.req = this.weatherApiService
	        	.getCurrentWeatherByLocation(position.coords.latitude, position.coords.longitude)
	        	.subscribe(result => {
	        		let weatherItem = new WeatherItem(
	        			result.name, 
	        			result.sys.country, 
	        			result.main.temp, 
	        			result.weather[0].main + ', ' + result.weather[0].description
	        		);

	        		//initial item
	        		this.weatherApiService.addWeatherItem(weatherItem);
	        		this.items = this.weatherApiService.getWeatherItems();
	        	},
			  	// If error in server/api temporary navigate to error page
				err => {
					console.log(err);
				});
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


	// Add weather data by city and country
	addCityCountry(){
		this.req = this.weatherApiService
		.searchWeatherData(this.input.search)
		.subscribe((result) => {
			let weatherItem = new WeatherItem(
				result.name, 
				result.sys.country, 
				result.main.temp, 
				result.weather[0].main + ', ' + result.weather[0].description
			);

			this.weatherApiService.addWeatherItem(weatherItem);
			this.input = <IWeatherInput>{}
			this.notFound = sessionStorage.getItem('notFound');
			console.log(this.weatherApiService.getWeatherItems());
		}, 
		// If error in server/api temporary navigate to error page
		err => {
			this.notFound = sessionStorage.getItem('notFound');
			console.log(err)
		});


	}

	// Remove city by array ID
	removeCityCountry(index){
		this.weatherApiService.clearWeatherItems(index);
		console.log(this.weatherApiService.getWeatherItems());
	}

	closeModal(){
		this.notFound = null;
		sessionStorage.removeItem('notFound')
	}

	ngOnDestroy(){
		if(this.req) this.req.unsubscribe();
	}

}

interface IWeatherInput{
	search : string,
}