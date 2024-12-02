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
    axios
      .get(`https://671990d57fc4c5ff8f4dc0cb.mockapi.io/movies/${searchId}`)
      .then((res) => {
        setValues(res.data);
        setErrorMessage(false);
        setShowDeleteForm(true);
        setSuccessMessage(false);
      })
      .catch(() => {
        setErrorMessage(true);
        setShowDeleteForm(false); // Reset the delete form state
        setSuccessMessage(false);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`https://671990d57fc4c5ff8f4dc0cb.mockapi.io/movies/${searchId}`)
      .then(() => {
        setSuccessMessage(true);
        setShowDeleteForm(false);
      })
      .catch((err) => console.log(err));
  };

  const handleBackFromError = () => {
    setErrorMessage(false); // Clear error message
    setSearchId(''); // Reset search ID
  };

  const renderSearchForm = () => (
    <div className="mb-5">
      <h1 className="text-center">Find Movie</h1>
      <form onSubmit={handleSearch}>
        <div className="mb-2 mt-3">
          <label htmlFor="searchId">Movie ID:</label>
          <input
            id="searchId"
            type="text"
            name="searchId"
            className="form-control"
            placeholder="Type the movie ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="float-end">
          <Link to="/" className="btn btn-secondary me-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
    </div>
  );

  const renderDeleteForm = () => (
    <div className="pt-5">
      <h1 className="text-center">Delete Movie</h1>
      <form onSubmit={handleDelete}>
        <div className="mb-2">
          <label htmlFor="name">Title:</label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            value={values.name}
            readOnly
          />
        </div>
        <div className="mb-2">
          <label htmlFor="genre">Genre:</label>
          <input
            id="genre"
            type="text"
            name="genre"
            className="form-control"
            value={values.genre}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year">Year:</label>
          <input
            id="year"
            type="text"
            name="year"
            className="form-control"
            value={values.year}
            readOnly
          />
        </div>
        <div className="float-end">
          <Link to="/" className="btn btn-secondary me-2">
            Cancel
          </Link>
          <button className="btn btn-danger">Delete</button>
        </div>
      </form>
    </div>
  );

  const renderErrorMessage = () => (
    <div className="pt-3 text-center">
      <p className="mt-2">Id not found.</p>
      <button className="btn btn-danger" onClick={handleBackFromError}>
        Back
      </button>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="text-center pt-3">
      <p>Movie deleted successfully</p>
      <Link to="/" className="btn btn-danger">
        Back
      </Link>
    </div>
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 border bg-light shadow px-5 pt-5 pb-5 rounded">
        {errorMessage && renderErrorMessage()}
        {successMessage && renderSuccessMessage()}
        {!errorMessage && !successMessage && !showDeleteForm && renderSearchForm()}
        {!errorMessage && !successMessage && showDeleteForm && renderDeleteForm()}
      </div>
    </div>
  );
}

export default Delete;
