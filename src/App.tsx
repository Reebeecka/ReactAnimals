import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='start'>
    <Link to="/animals">TILL ALLA DJUR</Link>
    </div>
  );
}

export default App;
