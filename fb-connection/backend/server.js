import express from 'express';
import cors from 'cors'

const app = express()

// app.use(cors({
//     origin:'http://localhost:5173'
// }))


app.get('/', (req, res)=>{
    res.send('Hello world from backend')
})

app.get('/api/jokes/', (req, res)=>{
    const jokes = [
  {
    "id": 1,
    "title": "The Skeleton's Social Life",
    "content": "Why didn't the skeleton go to the dance? He had no body to go with."
  },
  {
    "id": 2,
    "title": "The Scared Mathematician",
    "content": "Why was 6 afraid of 7? Because 7, 8, 9."
  },
  {
    "id": 3,
    "title": "The Fake Noodle",
    "content": "What do you call an imposter noodle? An Impasta."
  },
  {
    "id": 4,
    "title": "The Shy Tomato",
    "content": "Why did the tomato turn red? Because it saw the salad dressing."
  },
  {
    "id": 5,
    "title": "The Professional Thief",
    "content": "Why do seagulls fly over the ocean? Because if they flew over the bay, they’d be bagels."
  }
]
    res.send(jokes)
})



app.listen(5000, ()=>{
    console.log("Server is running on 5000");
    
})