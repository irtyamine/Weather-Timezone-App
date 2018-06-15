import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../../api/weather/weather-api.service';
import { WeatherProfileService } from '../../api/weather/weather-profile.service';
import { WeatherItem } from "./weather-item";
import { fadeIn } from '../../animations/fade-in';

@Component({
	selector: 'weather-list',
	animations: [fadeIn],
	templateUrl: './weather-list.component.html',
	styleUrls: ['./weather-list.component.scss'],
	providers: [WeatherApiService, WeatherProfileService]
})
export class WeatherListComponent implements OnInit {
	private req : any;
	items       : any;
	notFound    : any = null;
	saveProfile : boolean = false;
	input       : IWeatherInput;
	profileName : string;

	// for closing a modal programatically
	@ViewChild('btnClose') btnClose : ElementRef;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private weatherProfileService: WeatherProfileService,
		private weatherApiService: WeatherApiService) {  this.input = <IWeatherInput>{} }

	ngOnInit() {
		// Get your current location
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition((
		    //Set longitude and latitude
		    position => {
		    	this.subscribeToLocation(position);
		    }), this.showGeolocationError);
		} else { 
		    console.log("Geolocation is not supported by this browser.");
		}

		this.items = this.weatherApiService.getWeatherItems();
	}

	// subscribe geolocation
	subscribeToLocation(position){
    	this.req = this.weatherApiService
	    	.getCurrentWeatherByLocation(position.coords.latitude, position.coords.longitude)
	    	.subscribe(result => {
	    		const weatherItem = new WeatherItem(
	    			result.name, 
	    			result.sys.country, 
	    			result.main.temp, 
	    			result.weather[0].main + ', ' + result.weather[0].description
	    		);

	    		//initial item
	    		this.weatherApiService.addWeatherItem(weatherItem);
    	},
	  	// If error in server/api temporary navigate to error page
		err => {
			console.log(err);
		});
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
				this.saveProfile = true;
			}, 
		// If error in server/api temporary navigate to error page
		err => {
			this.notFound = sessionStorage.getItem('notFound');
			console.log(err)
		});
	}

	addProfile(){
		let address = this.weatherApiService.getWeatherItems().map(item => `${item.city}, ${item.country}`)
		this.weatherProfileService.saveNewProfile(address, this.profileName);
		this.btnClose.nativeElement.click();
	}

	// Remove city by array ID
	removeCityCountry(index): void{
		this.weatherApiService.clearWeatherItem(index);
	}

	closeModal(): void{
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