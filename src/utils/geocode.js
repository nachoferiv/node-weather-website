const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmFjaG9mZXJpdiIsImEiOiJjazZsMHYwNW8wODRzM2xvN3gyZDA3eXZzIn0.XN6b5WBFUlUBkKb9PNzUtg&limit=1'

    request( { url, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find the given location, try another search', undefined)
        } else {

            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = { geocode }