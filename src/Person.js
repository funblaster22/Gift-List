import React from 'react';
import GiftList from './GiftList.js';
import './App.css';

export default function Person({ name }) {

  return (
    <fieldset>
      <legend>{name}</legend>
      <GiftList name={name} />
    </fieldset>
  );
}
