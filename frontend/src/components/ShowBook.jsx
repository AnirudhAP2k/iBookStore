import React, { useEffect, useState } from "react";
import axios from "axios";
import Backbutton from "./Backbutton";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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
  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl mx-4 my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-3xl w-fit p-4 mx-8">
          <div className="my-4">
            <span className="teaxt-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="teaxt-xl mr-4 text-gray-500">Book</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="teaxt-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="teaxt-xl mr-4 text-gray-500">Published Year</span>
            <span>{book.publishedAt}</span>
          </div>
          <div className="my-4">
            <span className="teaxt-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4"></div>
          <span className="teaxt-xl mr-4 text-gray-500">Last Update Time</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
