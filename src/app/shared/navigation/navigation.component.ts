import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable, interval, pipe, timer } from 'rxjs';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	currentDate: Date;
	frameZone: any;

	constructor(public el: ElementRef) {
	}

	ngOnInit() {
		this.getCurrentTime();
	}

	// reload current time
	getCurrentTime(){
		let refreshTime = timer(1000, 1000);

		refreshTime.subscribe(() => {
			this.currentDate = new Date();
		});
	}

}
