const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

const app = express()

// Defining paths for Express Config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'If you need help, please contact ignacio.feriv@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {

        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(latitude, longitude, (err, { summary, temperature, precipChance }) => {

            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                location,
                forecast: summary + '. It is currently ' + temperature + ' degrees out.'
                + ' There is ' + precipChance + ' chance of rain.'
            })
        })
    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provice a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        message: 'Ups! Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        message: 'Error 404: Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})