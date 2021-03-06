import React from 'react';
import { Link } from "react-router-dom";
import API from '../utils/API';

function MembersTile(props) {
  return (
    <section>
        <div className="box">
          {/* <div class="dropdown is-active is-inline">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span><i class="fas fa-bars"></i></span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Dropdown item
                </a>
                <a class="dropdown-item">
                  Other dropdown item
                </a>
                <a href="#" class="dropdown-item is-active">
                  Active dropdown item
                </a>
                <a href="#" class="dropdown-item">
                  Other dropdown item
                </a>
                <hr class="dropdown-divider" />
                <a href="#" class="dropdown-item">
                  With a divider
                </a>
              </div>
            </div>
          </div> */}
          <h2 className="section-head has-text-centered"><span className="icon has-text-black-bis"><i class="fas fa-brain"></i></span> <Link to='/members' className="lnk">Members</Link></h2> <hr />
          <p>This will have general info with a hamburger menu upper left</p>
          {/* <ul className="list">
            {}
          </ul> */}
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus unde illum nulla voluptate necessitatibus libero accusantium impedit eaque vero. Odio quasi voluptates corrupti laudantium modi inventore voluptas repellendus voluptatibus voluptatem.</p>
        </div>
    </section>
  );
}

export default MembersTile;