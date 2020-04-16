const path = require('path');
const express = require('express');
const hbs =require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup Handlebars Engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory
app.use(express.static(publicDirPath))

//Home page (index)

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather Station',
        name: 'Scott Strool'
    })
})

//About Page
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Weather Station',
        name: 'Scott Strool'
    })
})

//Help Page
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Weather Station',
        msg: 'This Weather site will display weather data for your chosen location.',
        name: 'Scott Strool'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


    app.get('/products', (req, res)=> {
        if (!req.query.search) {
            return res.send({
                error: 'You must provide a search term'
            })
        }
      
        console.log(req.query)
        res.send({
            products: []
        })
    })
    app.get('/help/*', (req, res)=>{
        res.render('404', {
            title: '404',
            name: 'Scott Strool',
            message:    'Help Article not found'
        })
    })

    app.get('*', (req, res)=>{
        res.render('404', {
            title: '404',
            name: 'Scott Strool',
            message: 'Error, Page Not Found'
        } )
    })

//Start the Server
app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})
