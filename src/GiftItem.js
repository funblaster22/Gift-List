import React from 'react';

export default function GiftItem({ gift, addGift, autofocus }) {

  function updateGift(ev) {
    var value = ev.target.value;
    addGift(prev => {
      // TODO: make state copy
      gift.desc = value;
      return prev;
    });
  }

  function commitChange(ev) {
    var value = ev.target.value;
    addGift(prev => {
      // TODO: make state copy
      prev.delete(gift);
      return prev;
    });
  }

  function markCompleted(ev) {
    var checked = ev.target.checked;
    addGift(prev => {
      // TODO: make state copy
      gift.completed = checked;
      return prev;
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
