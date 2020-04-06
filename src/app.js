const path = require('path');
const express = require('express');
const hbs =require('hbs');

const app = express()

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

//Weather Page
app.get('/weather', (req, res)=>{
    res.render('weather',{
        Location: "Hawaii",
        Forecast: "Very Nice",
        Temperature: 75
        },
        {
            Location: "New York",
            Forecast: "Not so nice",
            Temperature: 55
        })
    })



//Start the Server
app.listen(3000,()=>{
    console.log('Server is up')
})
