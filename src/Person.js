import React from 'react';
import GiftList from './GiftList.js';

export default function Person({ name }) {

  return (
    <fieldset>
      <legend>{name}</legend>
      <GiftList />
    </fieldset>
  );
}
