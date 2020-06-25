import React, {useState} from 'react';
import Person from './Person.js';
import Login from './Login.js';
import './App.css';

function App() {
  const [people, addPerson] = useState(['Ethan', 'Natalie', 'Mom', 'Dad', 'Emmy']);
  return (
    localStorage.currentUser ? people.map(person => <Person key={person} name={person} />) :
      <Login />
  );
}

export default App;
