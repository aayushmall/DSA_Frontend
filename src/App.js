import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';
import Topics from './components/Topics';

// require('dotenv');

function App() {
  const [token, setToken] = useState('');
  const [completedSubtopics, setCompletedSubtopics] = useState([]);


  return (
    <div className="App">
      {!token ? (
        <Login setToken={setToken} setCompletedSubtopics={setCompletedSubtopics} />
      ) : (
        <Topics token={token} completedSubtopics={completedSubtopics} setCompletedSubtopics={setCompletedSubtopics} />
      )}
    </div>
  );
}

export default App;
