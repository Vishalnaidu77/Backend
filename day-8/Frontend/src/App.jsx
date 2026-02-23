import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {

  const [notes, setNotes] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [editingNoteId, seteditingNoteId] = useState('')
  const [updatedDesc, setUpdatedDesc] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:3000/notes")
    setNotes(data.notes)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, description, type } = e.target.elements;


    await axios.post("https://backend-1-xoms.onrender.com/notes", {
      title: titleInput,
      description: descriptionInput,
      type: type.value
    })

    setTitleInput('')
    setDescriptionInput('')

    fetchData()
  } 

  const handleDelete = async (noteId) => {
    await axios.delete(`https://backend-1-xoms.onrender.com/notes/${noteId}`)
    fetchData()
  }

  const handleUpdate = async (noteId) => {
    await axios.patch(`https://backend-1-xoms.onrender.com/notes/${noteId}`, {
      description: updatedDesc
    })
    setIsUpdate(false)
    seteditingNoteId('')
    setUpdatedDesc('')
    fetchData()
  }

  const handleEditClick = (note) => {
    if (isUpdate && editingNoteId === note._id) {
      handleUpdate(note._id)
      return
    }

    seteditingNoteId(note._id)
    setUpdatedDesc(note.description)
    setIsUpdate(true)
  }

  return (
    <div>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input 
          name='title' 
          value={titleInput} 
          onChange={(e) => setTitleInput(e.target.value)} 
          type="text" 
          placeholder='Enter Title'
        />
        <input 
          name='description' 
          type="text" 
          placeholder='Enter Description'
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          />
        <select name="type" id="">
          <option value="Note">Note</option>
          <option value="Task">Task</option>
          <option value="Resource">Resource</option>
          <option value="Document">Document</option>
        </select>
        <button type='submit'>Submit</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => (
        <div key={idx} className="note">
          <div className="heading">
            <h1>{note.title}</h1>
            <p className='type'>{note.type}</p>
          </div>
          {note._id === editingNoteId && isUpdate
            ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleUpdate(note._id)
                }}
              >
                <input name='updatedDescription' type="text" value={updatedDesc} onChange={(e) => setUpdatedDesc(e.target.value)} />
              </form>
            ) 
            : (
              <p>{note.description}</p>
            )
          }
          <div className="notes-btn">
            <button 
              type='button'
              onClick={() => handleEditClick(note)}
              >
                {isUpdate && editingNoteId === note._id ? 'Submit' : 'Edit'}
            </button>
            <button onClick={() => handleDelete(note._id)}>delete</button>
          </div>
        </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
