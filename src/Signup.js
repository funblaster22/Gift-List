import React, {useRef} from 'react';
import './App.css';
import {post} from './Constants.js';

export default function Signup({toggle}) {
  console.log('Generate family code...')
  const familyCodeRef = useRef();

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

  return (
    <form action="/api/new" method="post" onSubmit={() => {localStorage.currentUser = familyCodeRef.current.value}}>
      <label>
        Family Code:
        <input defaultValue={randomLetters(8)} minLength="8" ref={familyCodeRef} required onInput={validate} name="code" />
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
