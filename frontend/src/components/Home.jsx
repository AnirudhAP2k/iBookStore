import React, {useEffect, useState}from 'react'
import axios from 'axios'
import BookModal from './BookModal'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import { BiShow } from 'react-icons/bi'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});

    useEffect(()=>{
        setLoading(true);
            axios
            .get('http://localhost:5555/api/book/getallbooks')
            .then((response) => {
              setBooks(response.data.Books);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            })
          },[])

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to = '/createbook'>
        <MdOutlineAddBox className='text-sky-800 text-4xl' /> 
        </Link>
      </div>
      { loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>No.</th>
            <th className='border border-slate-600 rounded-md'>Title</th>
            <th className='border border-slate-600 rounded-md'>Author</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
            <th className='border border-slate-600 rounded-md'>Operations</th>
          </tr>
          </thead>
          <tbody>
              { books.map((book, index) =>{
                return(
                <tr key={book._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{book.author}</td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.publishedAt}</td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <BiShow
                        className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                        onClick={()=>{setData(book); setShowModal(true)}}
                        />
                      <Link to={`/showbook/${book._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
                      </Link>
                      <Link to={`/updatebook/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600'/>
                      </Link>
                      <Link to={`/deletebook/${book._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600'/>
                      </Link>
                    </div>
                    {/* {console.log(book._id)} */}
                    { showModal && (
                  <BookModal book = {data} onClose={()=>setShowModal(false)} />
                )}
                  </td>
                </tr>
              )})}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home
