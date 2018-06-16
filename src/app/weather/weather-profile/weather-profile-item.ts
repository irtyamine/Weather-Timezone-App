export class WeatherProfileItem {
    constructor(
    	public profileName: string, 
    	public address: string[] ) {
    		this.profileName = profileName;
    		this.address     = address;
    }
}