import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import axios from "axios";
const EditPost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    //     axios({
    // url:"http://localhost:4000/post/"+id,
    // method:'get'
    //     }).then((response) => {

    //         setTitle(response.data.title);
    //         setSummary(response.data.summary);
    //         setContent(response.data.content);

    //     });
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((post) => {
        setTitle(post.title);
        setSummary(post.summary);
        setContent(post.content);
      });
    });
  }, []);
  const updatePost = async (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (file?.[0]) {
      data.set("file", file?.[0]);
    }
    const response = await fetch("http://localhost:4000/post/", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <>
      <form onSubmit={updatePost}>
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
        <Editor onChange={setContent} value={content} />
        <button style={{ marginTop: "5px" }}>Update post</button>
      </form>
    </>
  );
};

export default EditPost;
