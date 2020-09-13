import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';
import {post} from "./Constants";

export default function Login({toggle, people, editPeople}) {

  function loadFamilyCode(ev) {
    const value = ev.target.value;
    const target = ev.target;
    post('/api/getFamily', {code: value}).then(res => {
      if (!res.error) {
        target.setCustomValidity("");
        editPeople(Object.keys(res));
      } else
        target.setCustomValidity(res.error);
    });
  }

  function beforeSubmit(ev) {
    const {code, name} = ev.target.elements;
    localStorage.familyName = code.value;
    localStorage.userName = name.value;
  }

  // https://material-ui.com/components/autocomplete/#combo-box
  return (
    <form action="/api/login" method="post" onSubmit={beforeSubmit}>
      <label>
        Family Code:
        <input onBlur={loadFamilyCode} name="code" required />
      </label>
      <button onClick={toggle.bind(this, false)}>New Family</button><br />
      <Autocomplete
        id="name"
        freeSolo
        options={people}
        renderInput={(params) => (
          <TextField {...params} label="Name" name="name" margin="normal" variant="outlined" required />
        )}
      />
      <button style={{width: '100%'}}>Log In</button>
    </form>
  );
}
