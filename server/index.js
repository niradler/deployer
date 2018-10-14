#!/usr/bin/env node
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const routes =require('./routes');
const services =require('./services');
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'))
app.use('/',async (req,res,next) => {
    try {
        const config = await services.getConfig();
        if (config.APP_KEY === req.query.appKey) {
            return next();
        }
        throw new Error('missing or incorrect app key!');
    } catch (error) {
        return res.status(401).send('missing or incorrect app key!');
    }
})
// API Routes
app.use('/', routes);

// initialize the server
const PORT = process.env.PORT || 544;
app.listen(PORT, () => console.log('App listening on port '+ PORT))
