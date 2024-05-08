import React, { useState } from "react";
import axios from "axios";

const CreateNote = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCreate = () => {
    if (!title || !content) {
      alert("Please fill out both the title and content");
      return;
    }
    const newNote = {
      title: title,
      content: content,
      status: "active",
    };
    onCreate(newNote);
    setTitle("");

    setContent("");
  };

  const generateContent = () => {
    console.log(title)

    if (!title) {
      return;
    }
    setLoading(true);
    const body = {
      prompt: title,
    };
    axios.post("http://localhost:5000/generate", body).then((response) => {
      setContent(response.data.text);
      setLoading(false);
    });
  };

  return (
    <div>
      <h2>Create Note</h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
      />
      <label>Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-control"
      ></textarea>
      <button
        className="btn btn-primary mt-2 w-100"
        onClick={generateContent}
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Loading..." : "Generate Content"}
      </button>


      <br />
      <button className="btn btn-primary mt-2  w-100" onClick={handleCreate}>
        Create Note
      </button>
    </div>
  );
};

export default CreateNote;
