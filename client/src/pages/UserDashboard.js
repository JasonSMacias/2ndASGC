import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import API from '../utils/API';
// import Modal from '../components/Modal';
import NearbyUsers from '../components/NearbyUsers';
import EditProfile from '../components/EditProfile';


class UserDashboard extends Component {

  state = {
    page: 0,
  }

  changePage = pageNumber => {
    this.setState({page: pageNumber})
  }

  render () {
    let pageOn = this.state.page;
    console.log("page = "+pageOn);
    return (
      <div className="box">
        <h2 className="section-head"><span className="icon has-text-black-bis"><i class="fas fa-user"></i></span >  <span className="pagehead">User Dashboard</span></h2> <hr />
        <ul>
          <li>
            <button onClick={() => this.changePage(1)} className="lnk button is-size-5">Edit profile</button>
          </li>
          <li>
            <button onClick={() => this.changePage(2)} className="lnk button is-size-5">Nearby Users</button>
          </li>
        </ul>
        {
          (pageOn === 1) ? <EditProfile />
          :
          (pageOn === 2) ? <NearbyUsers  />
          :
          "Temporary text for root Dashboard page"
        }
      </div>
    );
  }
}

export default UserDashboard;