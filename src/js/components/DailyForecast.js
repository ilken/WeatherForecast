import React from 'react';
import HourlyForecast from './HourlyForecast';

export default class DailyForecast extends React.Component {
	render () {
		const {date, data} = this.props;
		const DailyForecastComponents = data.map((hourlyData) => {
			return <HourlyForecast key={hourlyData.time} {...hourlyData}/>;
		});

		return (
			<div className="col-md-12 col-sm-12 col-xs-12">
	            <div className="row">
					<h2 className="text-center">{date}</h2>
				</div>
				<div className="row">
					{DailyForecastComponents}
	            </div>
			</div>
		);
	}
}
