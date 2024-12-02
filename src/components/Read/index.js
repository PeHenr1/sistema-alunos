import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {
  const { id } = useParams();

  const [values, setValues] = useState({
    name: '',
    genre: '',
    year: ''
  });

  useEffect(() => {
    document.body.style.overflowY = 'scroll'; 

    axios.get(`https://671990d57fc4c5ff8f4dc0cb.mockapi.io/movies/${id}`)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      document.body.style.overflowY = 'auto'; 
    };
  }, [id]); 

  return (
    <div className='w-50 border mb-5 justify-content-center bg-light shadow px-5 pt-5 pb-5 rounded m-auto'>
      <h1 className='text-center'>Movie Details</h1>
      <div className='pb-3'>
        <div className='mb-2'>
          <label htmlFor="name">Title:</label>
          <input
            id='name'
            type="text"
            name='name'
            className='form-control'
            value={values.name}
            readOnly 
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="genre">Genre:</label>
          <input
            id='genre'
            type="text"
            name='genre'
            className='form-control'
            value={values.genre}
            readOnly
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="year">Year:</label>
          <input
            id='year'
            type="text"
            name='year'
            className='form-control'
            value={values.year}
            readOnly
          />
        </div>
        <Link to="/" className='btn btn-danger float-end mb-5'>Back</Link>
      </div>
    </div>
  );
}

export default Read;
