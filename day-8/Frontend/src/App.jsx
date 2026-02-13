import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([ 
    {
      title: "test title 1",
      description: "test description 1",
      type: "demo"
    },
    {
      title: "test title 2",
      description: "test description 2",
      type: "demo"
    },
    {
      title: "test title 3",
      description: "test description 3",
      type: "demo"
    },
    {
      title: "test title 4",
      description: "test description 4",
      type: "demo"
    },
  ])

  const getData = async () => {
    const response = await axios.get("http://localhost:3000/notes")
    setNotes(response.data.notes)
  }

  getData()

  return (
    <div>
      <div className="notes">
        {
          notes.map((note) => (
        <div className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
        </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
