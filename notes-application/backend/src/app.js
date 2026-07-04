import express from 'express'
import notesRoutes from './routes/notes.routes.js'
import cors from 'cors'
import morgan from 'morgan'
const app = express()


app.use(express.json())
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(morgan("dev"))

app.use('/api/', notesRoutes)

app.get('/', (req, res)=>{
    res.send("Hello world from backend")
})


export default app;