# WeatherForecast
London Weather Forecast using openweathermap API

For Local Build:
 - npm install
 - npm run dev

API Response is cached:
 - localStorage.getItem("WEATHER_API_RESPONSE")

Public URL: https://weatherforecast-baf9c.firebaseapp.com/
 - Open Weather Map API is served over HTTP therefore I am loading local api response as fallback on HTTPS sites.

Local URL: http://localhost:3000/

Note: This app is using fetch web api which is not supported by all browsers.
 - http://caniuse.com/#feat=fetch
