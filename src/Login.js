import React from 'react';
import './App.css';

export default function Login(props) {

  return (
    <>
      <h1>Gift List App</h1>
      <h3>Add gifts without recipient seeing!</h3>
      <div className="perfectCenter">
        <div id="login">
          <label>
            Name:
            <select></select>
          </label>
          <button type="submit" style={{width: '100%'}}>Login</button>
        </div>
      </div>
    </>
  );
}
