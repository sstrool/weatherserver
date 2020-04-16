const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/2140fc87b0dc7a105465336f7da3eaa6/' + latitude + ',' + longitude 

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + Math.round(body.currently.temperature) + 'º. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast