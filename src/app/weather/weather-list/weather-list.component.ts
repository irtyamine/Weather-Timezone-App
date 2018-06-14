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
	private req: any;

	items: any;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private weatherApiService: WeatherApiService) { }

	ngOnInit() {
		// initialize Manila, PH as main 
		this.req = this.weatherApiService.getCurrentWeatherData('Manila', 'PH').subscribe(result => {
			let weatherItem = new WeatherItem(
				result.name, 
				result.sys.country, 
				result.main.temp, 
				result.weather[0].main + ', ' + result.weather[0].description
			);
			//initial item
			this.weatherApiService.addWeatherItem(weatherItem);
			this.items = this.weatherApiService.getWeatherItems();

			console.log(this.items, result);
		});
	}

	ngOnDestroy(){
		if(this.req) this.req.unsubscribe();
	}

}

