import express from 'express'

const app = express()

app.use('/api/notes', notesRoutes)

app.get('/', (req, res)=>{
    res.send("Hello world from backend")
})


export default app;