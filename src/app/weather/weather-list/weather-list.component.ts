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

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private weatherApiService: WeatherApiService) { }

	ngOnInit() {
		this.req = this.weatherApiService.getCurrentWeatherData('Manila', 'PH').subscribe(result => {
			let weatherItem = new WeatherItem(result.name, result.name, result.name, result.name);

			//initial item
			this.weatherApiService.addWeatherItem(weatherItem);

			console.log(this.weatherApiService.getWeatherItems());
		});
	}

	ngOnDestroy(){
		if(this.req) this.req.unsubscribe();
	}

}

