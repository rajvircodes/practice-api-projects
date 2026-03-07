const express = require('express');
const app = express()
const noteRouter = require('./routes/note.route')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', noteRouter)

app.get('/', (req, res)=>{
    res.send('Hello world from backend')
})


module.exports = app;