import { useEffect, useState } from 'react'
import './Note.css'
import api from '../api/axios.js'
const Note = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [notes, setNotes] = useState([])


    useEffect(() => {
        api.get('/notes')
            .then((response) => setNotes(response.data.notes))
            .catch((error) => error)
    }, [])

    function handleChange(e) {
        setTitle(e.target.value)
        // setDescription(e.target.value)
    }
    function handleDes(e) {
        setDescription(e.target.value)
    }

    const createNotes = async (e) => {
        e.preventDefault()

        if (!title.trim() || !description.trim()) {
            alert("All field required");
            return;
        }
        try {
            const response = await api.post('/notes/create', { title, description })
            setNotes([...notes, response.data.note])
            setTitle("");
            setDescription("")

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <div>
                <div className="container">
                    <div className="top">
                        <h1>Notes app</h1>
                        <h3>Add notes</h3>

                        <form>
                            <div className='title'>
                                <input type="text"
                                    placeholder='notes title...'
                                    value={title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="desc">
                                <textarea type="text"
                                    placeholder='Notes description'
                                    value={description}
                                    onChange={handleDes}
                                />
                            </div>
                            <button type='submit' onClick={createNotes}>Create note</button>
                        </form>
                    </div>
                    {
                        notes.map((note) => (

                            <div className="card" key={note._id}>
                                <h3>{note.title}</h3>
                                <p>{note.description}</p>
                                <div className="buttons">
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </>

    )
}

export default Note