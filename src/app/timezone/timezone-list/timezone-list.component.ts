import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeIn } from '../../animations/fade-in';
import { TimezoneApiService } from '../../api/timezone/timezone-api.service';
import { TimezoneProfileService } from '../../api/timezone/timezone-profile.service';
import { TimezoneItem } from './timezone-item';
import { TIMEZONE_ITEMS } from './mock-timezone-item';

@Component({
	selector: 'timezone-list',
	animations: [fadeIn],
	templateUrl: './timezone-list.component.html',
	styleUrls: ['./timezone-list.component.css'],
	providers: [TimezoneApiService]
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

	// for closing a modal programatically
	@ViewChild('btnClose') btnClose : ElementRef;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private timezoneApiService: TimezoneApiService,
		private timezoneProfileService: TimezoneProfileService) {  this.input = <ITimezoneInput>{} }

	ngOnInit() {
		this.subscribeToLocation();
		this.items = this.timezoneApiService.getTimezoneItems();
	}

	// get timezone by ip address
	subscribeToLocation(){
		this.req = this.timezoneApiService.getCurrentTimeByLocation()
		.subscribe(result => {
			const timezoneItem = new TimezoneItem(
				result.data.city,
				result.data.country,
				`${result.data.datetime.hour_12_wolz}:${result.data.datetime.minutes} 
				${result.data.datetime.hour_am_pm}`,
				result.data.datetime.date,
    			result.data.datetime.day_full,
    			result.data.datetime.offset_tzab,
    			result.data.datetime.offset_gmt,
    			result.data.datetime.offset_tzid
    		);

    		this.timezoneApiService.addTimezoneItem(timezoneItem);
		},
	  	// If error in server/api temporary navigate to error page
		err => {
			console.log(err);
		});
	}

	// Add timezone data by city and country
	addCityCountry(){
		this.req = this.timezoneApiService
			.searchTimezoneData(this.input.search)
			.subscribe((result) => {
				console.log(result)
				if(result.data.addresses.length !== 0){
					const timezoneItem = new TimezoneItem(
						result.data.addresses[0].city,
						result.data.addresses[0].country,
						`${result.data.addresses[0].datetime.hour_12_wolz}:${result.data.addresses[0].datetime.minutes} 
						${result.data.addresses[0].datetime.hour_am_pm}`,
						result.data.addresses[0].datetime.date,
		    			result.data.addresses[0].datetime.day_full,
		    			result.data.addresses[0].datetime.offset_tzab,
		    			result.data.addresses[0].datetime.offset_gmt,
		    			result.data.addresses[0].datetime.offset_tzid
		    		);

					this.timezoneApiService.addTimezoneItem(timezoneItem);
					this.input = <ITimezoneInput>{}
					this.notFound = sessionStorage.getItem('notFound');
					this.saveProfile = true;
				} else {
					sessionStorage.setItem('notFound', 'true');
					this.notFound = sessionStorage.getItem('notFound');
				}
			}, 
		// If error in server/api temporary navigate to error page
		err => {
			this.notFound = sessionStorage.getItem('notFound');
			console.log(err)
		});
	}

	addProfile(){
		let address = this.timezoneApiService.getTimezoneItems().map(item => {
			if(item.city){
				return `${item.city}, ${item.country}`;
			} else {
				return item.country;
			}
		})
		this.timezoneProfileService.saveNewProfile(address, this.profileName);
		this.btnClose.nativeElement.click();
	}

	// Remove city by array ID
	removeCityCountry(index): void{
		this.timezoneApiService.clearTimezoneItem(index);
	}

	// Close modal not found
	closeModal(): void{
		this.notFound = null;
		sessionStorage.removeItem('notFound')
	}

	ngOnDestroy(){
		TIMEZONE_ITEMS.splice(TIMEZONE_ITEMS.indexOf(this.items), 1)
		if(this.req) this.req.unsubscribe();
	}

}

interface ITimezoneInput{
	search : string,
}