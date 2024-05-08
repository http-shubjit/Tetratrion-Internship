import { useEffect, useState } from "react";
import "./App.css";
import CreateNote from "./Components/CreateNote";
import NoteList from "./Components/NoteList";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [UpdatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updateNoteID, setUpdateNoteID] = useState("");

  const handleCreateNote = (note) => {
    axios.post("http://localhost:5000/items/add", note).then((response) => {
      setNotes([...notes, response.data]);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/items/").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const getUpdateNoteID = (id) => {
    setUpdateNoteID(id);
  };

  const handleUpdateNote = () => {
    const updatedNote = {
      title: UpdatedTitle,
      content: updatedContent,
      status: "active",
      _id: updateNoteID,
    };
    axios
      .put(`http://localhost:5000/items/update/${updateNoteID}`, updatedNote)
      .then((response) => {
        setNotes(
          notes.map((note) => {
            if (note._id === updateNoteID) {
              return {
                ...note,
                title: UpdatedTitle,
                content: updatedContent,
              };
            }
            return note;
          })
        );
        setUpdatedTitle("");
        setUpdatedContent("");
      });
  };

  const handleDeleteNote = (id) => {
    // logic to delete note
    axios
      .delete(`http://localhost:5000/items/delete/${id}`)
      .then((response) => {
        setNotes(notes.filter((note) => note._id !== id));
      });
  };

  return (
    <div className="container">
      <CreateNote onCreate={handleCreateNote} />
      <NoteList
        notes={notes}
        onUpdate={getUpdateNoteID}
        onDelete={handleDeleteNote}
      />
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>Title:</label>
              <input
                type="text"
                value={UpdatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <label>Content:</label>
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleUpdateNote}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
