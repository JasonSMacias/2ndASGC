import React from 'react';
import { Link } from "react-router-dom";

function GameSitesTile(props) {
  return (
    <section>
        <div className="box">
          <h2 className="section-head has-text-centered"><span className="icon has-text-black-bis"><i class="fas fa-chess-board"></i></span> <Link to='/game-sites' className="lnk">Game Sites</Link></h2> <hr />
          <p>This will have general info with a hamburger menu upper left</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ipsum eius. Quis voluptates facilis quae quam amet ipsam reprehenderit. Quaerat asperiores id ducimus dolorum, esse iure numquam voluptatum dignissimos natus!</p>
        </div>
    </section>
  );
}

export default GameSitesTile;