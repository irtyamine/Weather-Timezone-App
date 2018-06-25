import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TimezoneProfileService } from '../../api/timezone/timezone-profile.service';
import { TimezoneApiService } from '../../api/timezone/timezone-api.service';
import { TimezoneProfileItem } from './timezone-profile-item';
import { TimezoneItem } from "../../timezone/timezone-list/timezone-item";

@Component({
	selector: 'timezone-profile',
	templateUrl: './timezone-profile.component.html',
	styleUrls: ['./timezone-profile.component.scss'],
	providers: [TimezoneProfileService, TimezoneApiService]
})
export class TimezoneProfileComponent implements OnInit {
	profiles : TimezoneProfileItem[];
	private req: any;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private timezoneApiService: TimezoneApiService, 
		private timezoneProfileService: TimezoneProfileService) { }

	ngOnInit() {
		// get list of profiles
		this.profiles = this.timezoneProfileService.getProfiles()
	}

	// Load selected profile to timezone list
	onLoadSelectedProfile(profile: TimezoneProfileItem){
		this.timezoneApiService.clearAllTimezoneItems();

		let addressArray = profile.address;

		addressArray.map((address) =>{
			this.req = this.timezoneApiService.searchTimezoneData(address)
			.subscribe(result => {
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
			}, 
			// If error in server/api temporary navigate to error page
			err => {
				console.log(err)
			});
		});
	}

	onDelete(profile: TimezoneProfileItem){
		this.timezoneProfileService.deleteProfile(profile);
	}

	ngOnDestroy(){
		if(this.req) this.req.unsubscribe();
	}

}
