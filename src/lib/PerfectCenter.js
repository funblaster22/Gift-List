import React from 'react';
import './../App.css';

export default function PerfectCenter({title, subtitle, children}) {

  return (
    <>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <div className="perfectCenter">
        <div id="login">
          {children}
        </div>
      </div>
    </>
  );
}
