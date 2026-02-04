import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {

  const [Notes, SetNotes] = useState([]);
  const [Edit_id, SetEdit_id] = useState(null);
  const [Edit_title, SetEdit_title] = useState("");
  const [Edit_description, SetEdit_description] = useState("");

  const Fetch_Data = async () => {
    let notes = await axios.get("http://localhost:3000/api/notes");
    SetNotes(notes.data.Notes);
  };


  const Note_Get_handler = async (title, description) => {
    await axios.post("http://localhost:3000/api/notes", {
      title: title,
      description: description,
    });

    Fetch_Data();
  };


  const Delete_handler = async (id) => {
    await axios.delete(`http://localhost:3000/api/notes/${id}`);
    Fetch_Data();
  };


  const Update_handler = (note) => {
    SetEdit_id(note._id);
    SetEdit_title(note.title);
    SetEdit_description(note.description);
  };


  const Save_handler = async () => {
    await axios.patch(`http://localhost:3000/api/notes/${Edit_id}`, {
      description: Edit_description,
      title: Edit_title,
    });

     SetEdit_id(null);
    SetEdit_title("");
    SetEdit_description("");
    Fetch_Data();
  };


  const Cancel_handler = () => {
    SetEdit_id(null);
    SetEdit_description("");
    SetEdit_title("");
  };


  const Form_submit = (e) => {
    e.preventDefault();
    let title = e.target[0].value;
    let description = e.target[1].value;
    Note_Get_handler(title, description);
    e.target.reset();
  };

  useEffect(() => {
    Fetch_Data();
  }, []);

  return (
    <>

      <form onSubmit={ Form_submit}>
        <input type="text" placeholder="Enter title" required />
        <input type="text" placeholder="Enter description" required />
        <input type="submit" id="submit" value="submit" />
      </form>


      <div className="notes">
        {Notes.map((note) => {
          if (note._id === Edit_id) {
            return (
              <div key={note._id} className="note" id="yes">
               <input type="text" value={Edit_title} onChange={(e)=>SetEdit_title(e.target.value)
               } />
              <input type="text" value={Edit_description} onChange={(e)=>
                        SetEdit_description(e.target.value)
               } />
                <button
                  id="delete"
                  onClick={Cancel_handler}>Cancel</button>
                <button
                  id="update"
                  onClick={Save_handler}>Save</button>
              </div>
            );
          } 
            return (
              <div key={note._id} className="note">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <button
                  id="delete"
                  onClick={() => {
                    Delete_handler(note._id);
                  }}
                >
                  Delete
                </button>
                <button
                  id="update"
                  onClick={() => {
                    Update_handler(note);
                  }}
                >
                  update
                </button>
              </div>
            );
        })}
      </div>
    </>
  );
};

export default App;
