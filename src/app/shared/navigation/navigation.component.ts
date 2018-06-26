import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	currentDate: Date;
	frameZone: any;

	constructor(public el: ElementRef) {
		this.currentDate = new Date();
	}

	ngOnInit() {
		
	}


}
