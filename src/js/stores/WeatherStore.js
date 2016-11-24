import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class WeatherStore extends EventEmitter {
	constructor () {
		super();
		this.weatherData = null;
	}

	loadData (data) {
		localStorage.setItem('WEATHER_RAW_API_RESPONSE', JSON.stringify(data));
		this.weatherData = this.filterWeatherData(data);
		localStorage.setItem('WEATHER_API_RESPONSE', JSON.stringify(this.weatherData));
		console.log(this.weatherData);
		this.emit('init');
	}

	loadCachedData (data) {
		this.weatherData = JSON.parse(localStorage.getItem('WEATHER_API_RESPONSE'));

		this.emit('init');
	}

	filterWeatherData (data) {
		let _data = {
			city: data.city.name,
			country: data.city.country,
			weather: {}
		}

		for(let forecast of data.list)
		{
			let date = new Date(forecast.dt_txt);
			if(!_data.weather[date.toLocaleDateString()])
			{
				_data.weather[date.toLocaleDateString()] = [];
			}

			_data.weather[date.toLocaleDateString()].push({
				date: date.toDateString(),
				time: date.toLocaleTimeString(),
				temperature: this.convertTemperature(forecast.main.temp),
				humidity: forecast.main.humidity,
				description: this.getWeatherDescription(forecast.weather)
			});
		}

		return _data;
	}

	convertTemperature(temp){
		return Number((temp - 32) * 5/9).toFixed(2);
	}

	getWeatherDescription(descriptions)
	{
		let _description = '';
		for(let desc of descriptions)
		{
			_description += desc.description;
		}

		return _description;
	}

	getWeatherData () {
		return this.weatherData;
	}

	handleActions (action) {
		switch (action.type) {
			case 'LOAD_WEATHER_DATA':
			{
				this.loadData(action.data);
				break;
			}
			case 'LOAD_CACHED_WEATHER_DATA':
			{
				this.loadCachedData();
				break;
			}
		}
	}
}

const weatherStore = new WeatherStore();
dispatcher.register(weatherStore.handleActions.bind(weatherStore));

export default weatherStore;
