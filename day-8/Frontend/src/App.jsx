import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await axios.get("http://localhost:3000/notes")
    setNotes(data.notes)
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, type } = e.target.elements

    await axios.post("http://localhost:3000/notes", {
      title: title.value,
      description: description.value,
      type: type.value
    })
    getData()
  }

  const handleDeleteNote = async (noteId) => {
    await axios.delete(`http://localhost:3000/notes/${noteId}`)
    getData()
  }

  const handleUpdateNote = async (noteId) => {
    await axios.patch(`http://localhost:3000/notes/${noteId}`, )
  }

  return (
    <div>

      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title'/>
        <input name='description' type="text" placeholder='Enter description'/>
        <select name="type" id="">
          <option value="Note">Note</option>
          <option value="Task">Task</option>
          <option value="Document">Document</option>
          <option value="Resource">Resource</option>
        </select>
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => (
        <div key={idx} className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <p>{note.type}</p>
          <button onClick={() => handleUpdateNote(note._id)}>Edit description</button>
          <button onClick={() => handleDeleteNote(note._id)}>delete</button>
        </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
