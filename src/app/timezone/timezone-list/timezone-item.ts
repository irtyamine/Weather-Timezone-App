export class TimezoneItem {
    constructor(
    	public city: string,
    	public country: string, 
        public hour: string,
    	public date: string,
        public day_full: string,
        public offset_tzab: string,
        public offset_gmt: string, 
    	public timezone_id: string) {
	    	this.city        = city;
	    	this.country     = country;
            this.hour        = hour;
	    	this.date        = date;
            this.day_full    = day_full;
            this.offset_tzab = offset_tzab;
            this.offset_gmt  = offset_gmt;
	    	this.timezone_id = timezone_id;
    }
}