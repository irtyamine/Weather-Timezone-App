import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeIn } from '../../animations/fade-in';
import { TimezoneApiService } from '../../api/timezone/timezone-api.service';

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
		private activatedRoute: ActivatedRoute,
		private timezoneApiService: TimezoneApiService) {  this.input = <ITimezoneInput>{} }

	ngOnInit() {
		this.req = this.timezoneApiService.getCurrentTimeByLocation().subscribe(result => {
			console.log(result);
		},
	  	// If error in server/api temporary navigate to error page
		err => {
			console.log(err);
		});
	}

}

interface ITimezoneInput{
	search : string,
}