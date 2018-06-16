export class WeatherItem {
    constructor(
    	public city: string,
    	public country: string, 
    	public temperature: number, 
    	public weather: string) {
	    	this.city        = city;
	    	this.country     = country;
	    	this.temperature = temperature;
	    	this.weather     = weather;
    }
}