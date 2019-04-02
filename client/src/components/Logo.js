import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

function Logo(props) {
  return (
    <Link to='/'>
    <div className="level-left">
      <div className="level-item">
      <h1 id="logo" className="has-text-white-bis">Abstract Strategy <br /> Gamers Club</h1>
      </div>
    </div>
    </Link>
  );
}

export default Logo;