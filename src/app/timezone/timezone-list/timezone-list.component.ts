import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeIn } from '../../animations/fade-in';

@Component({
	selector: 'timezone-list',
	templateUrl: './timezone-list.component.html',
	styleUrls: ['./timezone-list.component.css']
})
export class TimezoneListComponent implements OnInit {
	private req : any;
	items       : any;
	lat         : number;
	lng         : number;
	notFound    : any = null;
	saveProfile : boolean = false;
	input       : ITimezoneInput;
	profileName : string;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute) {  this.input = <ITimezoneInput>{} }

	ngOnInit() {
	}

}

interface ITimezoneInput{
	search : string,
}