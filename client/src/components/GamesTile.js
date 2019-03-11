import React from 'react';
import { Link } from "react-router-dom";

function GamesTile(props) {
  return (
    <section>
    
      <div className="box" >
        <h2 className="section-head has-text-centered"><span className="icon has-text-black-bis"><i class="fas fa-chess"></i></span >  <Link to='/games' className="lnk">Games</Link></h2> <hr />
        <p>This will have general info with a hamburger menu upper left</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus unde illum nulla voluptate necessitatibus libero accusantium impedit eaque vero. Odio quasi voluptates corrupti laudantium modi inventore voluptas repellendus voluptatibus voluptatem.</p>
      </div>
    
    </section>
  );
}

export default GamesTile;