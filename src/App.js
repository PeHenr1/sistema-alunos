import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Create from './components/Create';
import Update from './components/Update';
import Read from './components/Read';
import Delete from './components/Delete';
import Menu from './components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter >
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/update/' element={<Update />} />
        <Route path='/delete/' element={<Delete />} />
        <Route path='/read/:id' element={<Read />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;