export function groupByDay(forecasts) {
    const dailyForecasts = {};
    forecasts.forEach((forecast) => {
        const date = forecast.dt_txt.split(' ')[0];
        if (dailyForecasts[date]) {
            dailyForecasts[date].push(forecast);
        } else {
            dailyForecasts[date] = [forecast];
        }
    });
    return Object.values(dailyForecasts);
}