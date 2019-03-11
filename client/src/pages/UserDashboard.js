import React from 'react';
import GameSitesTile from '../components/GameSitesTile';
import GamesTile from '../components/GamesTile';
import MembersTile from '../components/MembersTile';

function UserDashboard(props) {
  return (

    <main className="columns is-gapless">
      <div className="column is-one-third">
        <MembersTile />
      </div>
      <div className="column is-one-third">
        <GamesTile />
      </div>
      <div className="column is-one-third">
        <GameSitesTile />
      </div>
    </main>
  );
}

export default UserDashboard;