const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' })

app.use(morgan('tiny'));

connectDB()

app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

app.use('/', require('./server/routes/router'));

const PORT = process.env.PORT || 8080
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })