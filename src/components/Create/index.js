import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const [values, setValues] = useState({
    name: '',
    genre: '',
    year: ''
  });
  
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://671990d57fc4c5ff8f4dc0cb.mockapi.io/movies', values)
      .then(res => {
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex justify-content-center pb-5 mb-5'>
      <div className='w-50 border bg-light shadow px-5 pt-3 pb-5 rounded'>
        <h1 className='text-center mt-4'>Add movie</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name">Title:</label>
            <input id='name' type="text" name='name' className='form-control'
              placeholder='Type the name of the movie'
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="genre">Genre:</label>
            <input id='genre' type="text" name='genre' className='form-control'
              placeholder='Type the genre of the movie'
              onChange={e => setValues({ ...values, genre: e.target.value })}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="year">Year:</label>
            <input id='year' type="text" name='year' className='form-control'
              placeholder='Type the release year of the movie'
              onChange={e => setValues({ ...values, year: e.target.value })}
            />
          </div>
          <div className='float-end'>
            <Link to="/" className='btn btn-secondary me-2'>Cancel</Link>
            <button className='btn btn-success'>Submit</button>
          </div>
          
          
        </form>
      </div>
    </div>
  )
}
export default Create;