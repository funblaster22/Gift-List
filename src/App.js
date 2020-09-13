import React, {useState, useEffect} from 'react';
import Person from './Person.js';
import Login from './Login.js';
import Signup from './Signup.js';
import PerfectCenter from './lib/PerfectCenter.js';
import {FAMILY_MEMBERS} from './Constants.js';
import './App.css';

function App() {
  const [people, addPerson] = useState([]);
  const [hasFamily, setHasFamily] = useState(true);

  // Run only once
  useEffect(() => {
    FAMILY_MEMBERS.then(people => {
      console.log(people);
      addPerson(Object.keys(people));
    });
  }, [])

  return (
    localStorage.familyName ? people.map(person => <Person key={person} name={person} />) :
      <PerfectCenter title="Gift List App" subtitle="Add gifts without recipient seeing!">
      {hasFamily ? <Login toggle={setHasFamily} people={people} editPeople={addPerson} /> : <Signup toggle={setHasFamily} />}
      </PerfectCenter>
  );
}

export default App;
