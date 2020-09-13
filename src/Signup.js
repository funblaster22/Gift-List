import React from 'react';
import './App.css';
import {post} from './Constants.js';

export default function Signup({toggle}) {
  console.log('Generate family code...');

  function randomLetters(length) {
    var final = "";
    for (var i=0; i<Math.ceil(length/11); i++)
      final += Math.random().toString(36).substring(2);
    return final.substring(0, length);
  }

  async function validate(ev) {
    var target = ev.target;
    var valid = await post('/api/codeExists', {code: target.value});
    console.log("Validity:", !valid);
    if (valid) {
      target.setCustomValidity("That family code already exists! Choose another");
    } else {
      target.setCustomValidity("");
    }
  }

  function beforeSubmit(ev) {
    const {code, name} = ev.target.elements;
    localStorage.familyName = code.value;
    localStorage.userName = name.value;
  }

  // TODO: css styles for invalid input (:invalid)
  return (
    <form action="/api/new" method="post" onSubmit={beforeSubmit}>
      <label>
        Family Code:
        <input defaultValue={randomLetters(8)} minLength="8" required onInput={validate} name="code" />
      </label>
      <button onClick={toggle.bind(this, true)}>Join Family</button><br />
      <label>
        Name:
        <input name="name" required />
      </label>
      <button type="submit" style={{width: '100%'}}>Sign Up</button>
    </form>
  );
}
