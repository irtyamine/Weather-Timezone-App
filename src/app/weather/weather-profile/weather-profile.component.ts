import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherProfileService } from '../../api/weather/weather-profile.service';
import { WeatherApiService } from '../../api/weather/weather-api.service';
import { WeatherProfileItem } from './weather-profile-item';
import { WeatherItem } from "../../weather/weather-list/weather-item";

@Component({
	selector: 'weather-profile',
	templateUrl: './weather-profile.component.html',
	styleUrls: ['./weather-profile.component.scss'],
	providers: [WeatherProfileService, WeatherApiService]
})
export class WeatherProfileComponent implements OnInit {
	profiles : WeatherProfileItem[];
	private req: any;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private weatherApiService: WeatherApiService, 
		private weatherProfileService: WeatherProfileService) { }

	ngOnInit() {
		// get list of profiles
		this.profiles = this.weatherProfileService.getProfiles()
	}

	// Load selected profile to weather list
	onLoadSelectedProfile(profile: WeatherProfileItem){
		this.weatherApiService.clearAllWeatherItems();

		let addressArray = profile.address;

		addressArray.sort().map((address) =>{
			this.req = this.weatherApiService.searchWeatherData(address)
			.subscribe(result => {
				const weatherItem = new WeatherItem(
					result.name, 
					result.sys.country, 
					result.main.temp, 
					result.weather[0].main + ', ' + result.weather[0].description
				);

				this.weatherApiService.addWeatherItem(weatherItem);
			}, 
			// If error in server/api temporary navigate to error page
			err => {
				console.log(err)
			});
		});
	}

	onDelete(profile: WeatherProfileItem){
		this.weatherProfileService.deleteProfile(profile);
	}

	ngOnDestroy(){
		if(this.req) this.req.unsubscribe();
	}

}
