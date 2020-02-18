const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/3ccc0dce0de3016829a8971cbedafe6f/' + lat + ',' + long +'?units=us'

    request( { url, json: true}, (err, { statusCode, body }) => {
        if (err) {
            const msg = 'Unable to connect to forecast service'
            callback(msg, undefined)
        } else if (statusCode !== 200) {
            const msg = 'Unable to get the forecast for the given coords'
            callback(msg, undefined)
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                precipChance: body.currently.precipProbability,
            })
        }
    })
}

module.exports = { forecast }