const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/3ccc0dce0de3016829a8971cbedafe6f/' + lat + ',' + long + '?units=si'

    request( { url, json: true}, (err, { statusCode, body }) => {
        if (err) {
            const msg = 'Unable to connect to forecast service'
            callback(msg, undefined)
        } else if (statusCode !== 200) {
            const msg = 'Unable to get the forecast for the given coords'
            callback(msg, undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, {
                summary: body.daily.data[0].summary,
                maxTemp: body.daily.data[0].temperatureHigh,
                minTemp: body.daily.data[0].temperatureLow,
                temperature: body.currently.temperature,
                precipChance: body.currently.precipProbability,
                windSpeed: body.daily.data[0].windSpeed
            })
        }
    })
}

module.exports = { forecast }