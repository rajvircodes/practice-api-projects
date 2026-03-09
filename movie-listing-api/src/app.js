const express = require('express')
const morgan = require('morgan')
const errorHandler = require('./middleware/error.middleware')
const authRoutes = require('./routes/auth.routes')

const app = express()

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler)


app.use('/api/auth', authRoutes)



app.get('/', (req, res)=>{
    res.json({
        message:"Movie API running"
    });
});



// app.use('/api/auth/register')



module.exports = app;