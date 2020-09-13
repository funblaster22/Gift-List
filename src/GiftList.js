import React, {useState, useEffect} from 'react';
import GiftItem from './GiftItem.js';
import {FAMILY_MEMBERS, post} from "./Constants";

export default function GiftList({name}) {
  const [gifts, addGift] = useState([]);
  // {desc: "something cool", completed: false, addedBy: "" }

  useEffect(() => {
    // TODO: filter items added by other members
    FAMILY_MEMBERS.then(people => {
      console.log(name, people[name])
      addGift(people[name]);
    });
  }, []);

  useEffect(() => {
    post('/api/addGift', {to: name, gifts: gifts});
  }, [gifts]);

  function newGift(ev) {
    var value = ev.target.value;
    ev.target.value = null;
    addGift(prev => {
      return [...prev, {desc: value, completed: false, addedBy: localStorage.userName}];
    });
  }

  return (
    <>
    { gifts.map((gift, i) =>
      <GiftItem key={i} index={i} gift={gift} addGift={addGift} autofocus={i+1===gifts.length} />) }
    <input type="checkbox" disabled />
    <input type="text" onChange={newGift} />
    </>
  );
}
