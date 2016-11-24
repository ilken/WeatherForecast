import React from 'react';
import DailyForecast from './DailyForecast';
import WeatherStore from '../stores/WeatherStore';
import * as WeatherActions from '../actions/WeatherActions';

export default class Weather extends React.Component {
	constructor () {
		super();
		this.state = {
			data: {
				city: null,
				country: null,
				weather: {}
			}
		};
	}

	componentWillMount () {
		WeatherStore.on('init', () => {
			this.setState({
				data: WeatherStore.getWeatherData()
			});
		});

		if(!localStorage.getItem('WEATHER_API_RESPONSE')) {
			let url = 'http://api.openweathermap.org/data/2.5/forecast?id=2643744&appid=2e51af647faa378d0caabc1ca59a28c0';
			fetch(url,{mode: 'cors'})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				WeatherActions.update(data);
			})
			.catch((err) => {
				console.log("API ERROR:", err);
			});
		}
		else {
			WeatherActions.loadCachedData();
		}
	}

	render () {
		const { city, country, weather } = this.state.data;
		const WeatherComponents = Object.keys(weather).map((date) => {
			return <DailyForecast key={date} date={date} data={weather[date]}/>;
		});

		return (
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <h1 className="text-center">
						{city},{country}
					</h1>
                </div>
                {WeatherComponents}
            </div>
		);
	}
}
