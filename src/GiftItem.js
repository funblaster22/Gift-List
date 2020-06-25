import React from 'react';

export default function GiftItem({ index, gift, addGift, autofocus }) {

  function updateGift(ev) {
    var value = ev.target.value;
    addGift(prev => {
      var copy = [...prev];
      copy[index].desc = value;
      console.debug(copy);
      return copy;
    });
  }

  function commitChange(ev) {
    var value = ev.target.value;
    addGift(prev => {
      var copy = [...prev];
      if (value === '')
        copy.splice(index, 1);
      return copy;
    });
  }

  function markCompleted(ev) {
    var checked = ev.target.checked;
    addGift(prev => {
      var copy = [...prev];
      copy[index].completed = checked;
      console.debug(copy, checked);
      return copy;
    });
  }

  return (
    <>
      <input type="checkbox" checked={gift.completed} onChange={markCompleted} />
      <input type="text" value={gift.desc} disabled={gift.completed} autoFocus={autofocus} onChange={updateGift} onBlur={commitChange} />
      <br />
    </>
  );
}
