import React, {useState} from 'react';
import Person from './Person.js';
import Login from './Login.js';
import Signup from './Signup.js';
import PerfectCenter from './lib/PerfectCenter.js';
import './App.css';

function App() {
  const [people, addPerson] = useState(['Ethan', 'Natalie', 'Mom', 'Dad', 'Emmy']);
  const [hasFamily, setHasFamily] = useState(true);

  return (
    localStorage.currentUser ? people.map(person => <Person key={person} name={person} />) :
      <PerfectCenter title="Gift List App" subtitle="Add gifts without recipient seeing!">
      {hasFamily ? <Login toggle={setHasFamily} people={people} editPeople={addPerson} /> : <Signup toggle={setHasFamily} />}
      </PerfectCenter>
  );
}

export default App;
