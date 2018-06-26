import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherProfileService } from '../api/weather/weather-profile.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	frameZone: any;

	constructor(public el: ElementRef) { }

	ngOnInit() {
		this.frameZone = Array.from(document.querySelectorAll('a[href^="#"]'));

		this.frameZone.forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();

				document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
				});
			});
		});
	}
}
