import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('https://671990d57fc4c5ff8f4dc0cb.mockapi.io/movies')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h1 className='mb-4 text-white'>Movies</h1>
      <div className="w-75" style={{ height: '60vh' }}>
        <div className="d-flex flex-column mb-5">
          {data.map((d, i) => (
            <Link to={`/read/${d.id}`} key={i} className='mb-3 text-decoration-none'>
              <div className="d-flex flex-column p-3 border rounded h-auto hover-effect" style={{ backgroundColor: 'white' }}> 
                <div className="d-flex align-items-center">
                  <p className="me-4 mb-0 text-black">ID: {d.id}</p>
                  <p className="mb-0 text-black">Nome: {d.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
  

}
export default Home;