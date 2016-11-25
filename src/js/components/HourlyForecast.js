import React from 'react';

export default class HourlyForecast extends React.Component {
	render () {
		const { description, humidity, temperature, time } = this.props;
		const img = 'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png';

		return (
			<div className="col-md-3 col-sm-3 col-xs-12">
	            <div className="row">
					<div className="col-md-12 col-sm-12 col-xs-12">
						<p className="text-center time">{time}</p>
					</div>
				</div>
	            <div className="row details">
					<div className="col-md-12 col-sm-12 col-xs-12">
						<img className="img-responsive center-block" alt={description} src={img}/>
					</div>
					<div className="col-md-12 col-sm-12 col-xs-12">
						<p className="text-center temperature">{temperature}&deg;C</p>
						<p className="text-center description">{description}</p>
						<p className="text-center humidity">Humidity: {humidity}%</p>
					</div>
				</div>
			</div>
		);
	}
}
