import React from "react";

const NoteList = ({ notes, onUpdate, onDelete }) => {
  return (
    <div>
      <br />
      <br />
      <h2>Notes</h2>
      <hr />
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>Status: {note.status}</p>
            <button
              style={{
                width: "100px",
                height: "30px",
                textAlign: "center",
                padding: "5px",
              }}
              onClick={() => onUpdate(note._id)}
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Update
            </button>
            <button
              style={{
                width: "100px",
                height: "30px",
                textAlign: "center",
                padding: "5px",
                backgroundColor: "red",
              }}
              onClick={() => onDelete(note._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
