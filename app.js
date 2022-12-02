const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const expresshbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require("handlebars");
const PORT = process.env.PORT || 3000
const app = express()
const hbs = expresshbs.create({
    defaultLayout: 'main',
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/todos'))

async function start() {
    try {
        await mongoose.connect("mongodb://localhost:27017/todo", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('Server start...')
        })
    } catch (err) {
        console.error(err.message)
    }
}

start()