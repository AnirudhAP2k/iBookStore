import React, { useState, useEffect } from "react";
import axios from "axios";
import Backbutton from "./Backbutton";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [book, setBook] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/api/book/getbook/${id}`)
      .then((res) => {
        setBook(res.data.book);
        setLoading(false);
      }, [])
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/api/book/deletebook/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", {variant: 'success'})
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl" style={{ margin: "30px" }}>
        Delete Book
      </h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 w-[600px] mx-auto">
        <h3 className="text-2xl">
          <i>
            <strong>Are you sure to delete this book</strong>
          </i>
        </h3>
        {/* <div className="flex flex-col border-2 border-sky-400 rounded-3xl w-fit p-4 mx-8"> */}
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Id</span>
          <span>{book._id}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Book</span>
          <span>{book.title}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Author</span>
          <span>{book.author}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Published Year</span>
          <span>{book.publishedAt}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Create Time</span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>
        {/* </div> */}
        <button
          className="p-4 bg-red-600 text-white m-4 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
