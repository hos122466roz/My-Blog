import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);
  const createNewPOst = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file[0]);

    //  const response =  axios({
    //   url:"http://localhost:4000/post",
    //   method:'POST',
    //   data:data
    // })
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials:'include'
    });
    if (response.ok) {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return (
    <>
      <form onSubmit={createNewPOst}>
        <input
          type="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files)}
        />
        <Editor
          onChange={setContent}
          value={content}
         
        />
        <button style={{ marginTop: "5px" }}>Create post</button>
      </form>
    </>
  );
};

export default CreatePost;
