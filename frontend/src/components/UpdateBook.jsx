import React, { useEffect, useState } from "react";
import axios from "axios";
import Backbutton from "./Backbutton";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useSnackbar } from "notistack";

const Updatebook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect( () => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/api/book/getbook/${id}`)
      .then((res) => {
        setAuthor(res.data.book.author);
        setTitle(res.data.book.title);
        setPublishedAt(res.data.book.publishedAt);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        alert(error)
        setLoading(false);
      })
  }, [])
  const handleUpdatebook = () => {
    const data = {
      title,
      author,
      publishedAt
    }
    setLoading(true);
    axios
      .put(`http://localhost:5555/api/book/updatebook/${id}`, data)
      .then(()=>{
        setLoading(false);
        enqueueSnackbar("Book Updated Successfully", {variant: 'success'})
        navigate('/');
      })
      .catch((error)=>{
        console.log(error);
        enqueueSnackbar(error.response.data.error, {variant: 'error'})
        setLoading(false);
      })
  }
  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4" style={{margin: "30px"}} >Update Book</h1>
      { loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="border-2 border-gray-500 rounded-xl px-4 py-2 w-full"/>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input 
            type="text"
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
            className="border-2 border-gray-500 rounded-xl px-4 py-2 w-full"/>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input 
            type="text"
            value={publishedAt}
            onChange={(e)=>setPublishedAt(e.target.value)}
            className="border-2 border-gray-500 rounded-xl px-4 py-2 w-full"/>
        </div>
        <button className="p-2 bg-sky-300 text-xl m-8" onClick={handleUpdatebook}>Update Book</button>
      </div>
    </div>
  )
}

export default Updatebook
