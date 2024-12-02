import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Delete() {
  const [searchId, setSearchId] = useState('');
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [values, setValues] = useState({
    name: '',
    genre: '',
    year: ''
  });

  useEffect(() => {
    document.body.style.overflowY = 'scroll';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    axios.get(`https://671990d57fc4c5ff8f4dc0cb.mockapi.io/movies/${searchId}`)
      .then(res => {
        setValues(res.data);
        setErrorMessage(false);
        setShowDeleteForm(true);
        setSuccessMessage(false);
      })
      .catch(err => {
        setErrorMessage(true);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    axios.delete(`https://671990d57fc4c5ff8f4dc0cb.mockapi.io/movies/${searchId}`)
      .then(() => {
        setSuccessMessage(true);
        setShowDeleteForm(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='w-50 border bg-light shadow px-5 pt-5 pb-5 rounded'>
        {!errorMessage ? (
          <>
            {!successMessage ? (
              <>
                {!showDeleteForm ? (
                  <>

                    <h1 className='text-center'>Find Movie</h1>
                    <form onSubmit={handleSearch}>
                      <div className='mb-2 mt-3'>
                        <label htmlFor="searchId">Movie ID:</label>
                        <input
                          id='searchId'
                          type="text"
                          name='searchId'
                          className='form-control'
                          placeholder='Type the movie ID'
                          value={searchId}
                          onChange={e => setSearchId(e.target.value)}
                        />
                      </div>
                      <div className='float-end'>
                        <Link to="/" className='btn btn-secondary me-2'>Cancel</Link>
                        <button type="submit" className='btn btn-primary'>Search</button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>

                    <div className='mb-5'>
                      <h1 className='text-center'>Find Movie</h1>
                      <form onSubmit={handleSearch}>
                        <div className='mb-2 mt-3'>
                          <label htmlFor="searchId">Movie ID:</label>
                          <input
                            id='searchId'
                            type="text"
                            name='searchId'
                            className='form-control'
                            placeholder='Type the movie ID'
                            value={searchId}
                            onChange={e => setSearchId(e.target.value)}
                          />
                        </div>
                        <div className='float-end'>
                          <Link to="/" className='btn btn-secondary me-2'>Cancel</Link>
                          <button type="submit" className='btn btn-primary'>Search</button>
                        </div>
                      </form>
                    </div>

                    <div className='pt-5'>
                      <h1 className='text-center'>Delete Movie</h1>
                      <form onSubmit={handleDelete}>
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
                            placeholder='Type the new genre of the movie'
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
                            placeholder='Type the new release date of the movie'
                            value={values.year}
                            readOnly
                          />
                        </div>
                        <div className='float-end'>
                          <Link to="/" className='btn btn-secondary me-2'>Cancel</Link>
                          <button className='btn btn-danger'>Delete</button>
                        </div>

                      </form>
                    </div>

                  </>
                )}</>):(<>
                    <div className='mb-5'>
                      <h1 className='text-center'>Find Movie</h1>
                      <form onSubmit={handleSearch}>
                        <div className='mb-2 mt-3'>
                          <label htmlFor="searchId">Movie ID:</label>
                          <input
                            id='searchId'
                            type="text"
                            name='searchId'
                            className='form-control'
                            placeholder='Type the movie ID'
                            value={searchId}
                            onChange={e => setSearchId(e.target.value)}
                          />
                        </div>
                        <div className='float-end'>
                          <Link to="/" className='btn btn-secondary me-2'>Cancel</Link>
                          <button type="submit" className='btn btn-primary'>Search</button>
                        </div>
                      </form>
                    </div>
                    <div className='text-center pt-3'>
                      <p>Movie deleted successfully</p>
                      <Link to="/" className='btn btn-danger'>Back</Link>
                    </div>
                </>)}
              </>) : (<>
                <div className='mb-5'>
                  <h1 className='text-center'>Find Movie</h1>
                  <form onSubmit={handleSearch}>
                    <div className='mb-2 mt-3'>
                      <label htmlFor="searchId">Movie ID:</label>
                      <input
                        id='searchId'
                        type="text"
                        name='searchId'
                        className='form-control'
                        placeholder='Type the movie ID'
                        value={searchId}
                        onChange={e => setSearchId(e.target.value)}
                      />
                    </div>
                    <div className='float-end'>
                      <Link to="/" className='btn btn-secondary me-2'>Cancel</Link>
                      <button type="submit" className='btn btn-primary'>Search</button>
                    </div>
                  </form>
                </div>
                <div className='pt-3 text-center'>
                  <p className='mt-2'>Id not found.</p>
                  <Link to="/" className='btn btn-danger'>Back</Link>
                </div>

              </>)}

          </div>
      </div>
      );
}

      export default Delete;
