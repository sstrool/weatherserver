const path = require('path')
const express = require('express')

const app = express()
const publicDirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))

//Home page
app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather Station'
    })
})


//About Page
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Weather',
        name: 'Scott Strool'
    })
})

//Help Page
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Weather Station',
        msg: 'This Weather site will display weather data for your chosen location.',
    })
})

app.get('/weather', (req, res)=>{
    res.send([{
        Location: "Hawaii",
        Forecast: "Very Nice"
        },
        {
            Location: "New York",
            Forecast: "Not so Nice"
        }])
    })



app.listen(3000,()=>{
    console.log('Server is up')
})
