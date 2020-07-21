import React from 'react';
import './App.css';

export default function Signup({toggle}) { console.log('generate Family code...')

  function randomLetters(length) {
    var final = "";
    for (var i=0; i<Math.ceil(length/11); i++)
      final += Math.random().toString(36).substring(2);
    return final.substring(0, length);
  }

  return (
    <form action="/api/new" method="post">
      <label>
        Family Code:
        <input defaultValue={randomLetters(8)} name="code" />
      </label>
      <button onClick={toggle.bind(this, true)}>Join Family</button><br />
      <label>
        Name:
        <input name="name" />
      </label>
      <button type="submit" style={{width: '100%'}}>Sign Up</button>
    </form>
  );
}
