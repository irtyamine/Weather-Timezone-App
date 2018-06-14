import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../api/weather/weather-api.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	input: IWeatherInput;

	constructor() { this.input = <IWeatherInput>{} }

	ngOnInit() {
	}


}

interface IWeatherInput{
	city: string,
	country: string
}