const express = require('express')
const morgan = require('morgan')

// Requiring routes
const errorHandler = require('./middleware/error.middleware')
const authRoutes = require('./routes/auth.routes')
const movieRoutes = require('./routes/movie.routes')

// const {protected} = require('./middleware/auth.middleware')
const app = express()

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler)

// Using routes
app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)

// Protected 
// app.get('/api/protected', protected, (req, res)=>{
//     res.json({
//         message:"Protected route accessed",
//         user: req.user
//     })
// })


app.get('/', (req, res)=>{
    res.json({
        message:"Movie API running"
    });
});



// app.use('/api/auth/register')



module.exports = app;