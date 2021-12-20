const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const path = require('path')

const app = express()

// settings
app.set('port', process.env.PORT || 2000)
app.set('views', path.join(__dirname, 'views'))
app.engine(
	'.hbs',
	engine({
		layoutsDir: path.join(app.get('views'), 'layouts'),
		defaultLayout: 'main',
		extname: '.hbs',
	})
)
app.set('view engine', '.hbs')

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))

// routes
app.use(require('./routes/router.js'))

// static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
