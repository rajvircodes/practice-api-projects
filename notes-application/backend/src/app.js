import express from 'express'
import notesRoutes from './routes/notes.routes.js'
const app = express()

app.use(express.json())

app.use('/api/notes', notesRoutes)

app.get('/', (req, res)=>{
    res.send("Hello world from backend")
})


export default app;