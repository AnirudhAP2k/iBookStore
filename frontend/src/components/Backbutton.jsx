import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const Backbutton = () => {
  return (
    <div className='flex mx-4'>
      <Link className='bg-sky-800 text-white px-4 pu-1 rounded-lg w-fit' to={'/'}>
        <BsArrowLeft className='text-2xl'/>
      </Link>
    </div>
  )
}

export default Backbutton
