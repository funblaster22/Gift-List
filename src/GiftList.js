import React, {useState, useEffect} from 'react';
import GiftItem from './GiftItem.js';
import {FAMILY_MEMBERS, post} from "./Constants";

export default function GiftList({name}) {
  const [gifts, addGift] = useState([]);

  useEffect(() => {
    // TODO: filter items server side (for particularly nosey children)?
    FAMILY_MEMBERS.then(people => {
      const gifts = people[name].filter(item => name !== localStorage.userName || name === item.addedBy)
      addGift(gifts);
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
