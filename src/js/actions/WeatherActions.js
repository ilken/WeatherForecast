import dispatcher from '../dispatcher';

export function loadCachedData () {
	dispatcher.dispatch({
		type: 'LOAD_CACHED_WEATHER_DATA'
	});
}

export function update (data) {
	dispatcher.dispatch({
		type: 'LOAD_WEATHER_DATA',
		data
	});
}
