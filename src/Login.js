import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';

export default function Login({toggle, people, editPeople}) {

  function loadFamilyCode(ev) {
    var value = ev.target.value;
    editPeople(["a", "b", "c"]);
  }

  // https://material-ui.com/components/autocomplete/#combo-box
  return (
    <>
      <label>
        Family Code:
        <input onBlur={loadFamilyCode} />
      </label>
      <button onClick={toggle.bind(this, false)}>New Family</button><br />
      <Autocomplete
        id="name"
        freeSolo
        options={people}
        renderInput={(params) => (
          <TextField {...params} label="Name" margin="normal" variant="outlined" />
        )}
      />
      <button style={{width: '100%'}}>Log In</button>
    </>
  );
}
