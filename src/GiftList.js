import React, {useState, useEffect} from 'react';
import GiftItem from './GiftItem.js';

export default class GiftList extends React.Component {
  constructor(props) {
    super(props);
    //const [gifts, addGift] = useState([{desc: "something cool", completed: false }]);
    this.state = new Set([{desc: "something cool", completed: false }]);
  }

  newGift(ev) {
    var value = ev.target.value;
    ev.target.value = null;
    this.setState(prev => {
      return prev.add({desc: value, completed: false}); // TODO: make state copy
    });
  }

  render() {
    console.debug(this.state);
    return (
      <>
      { this.state.forEach(gift =>
        <GiftItem key={gift.id} gift={gift} addGift={this.setState.bind(this)} autofocus="true" />) }
      <input type="checkbox" disabled />
      <input type="text" onChange={this.newGift.bind(this)} />
      </>
    );
  }
}
