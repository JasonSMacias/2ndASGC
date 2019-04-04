import React, {Component} from 'react';
import { Link } from "react-router-dom";
import API from '../utils/API';

class NearbyUsers extends Component {
  state = {
    userId: "",
    distanceResponse: []
  }
  usercheck = () => {
    API
      .userCheck()
      .then(res => {
        
        // res is object that can be checked at 3001 api/users/status
        console.log("user check: "+ res.data.id + " " + res.data.username);

        this.setState({
          userId: res.data.id,
          });
      })
    
  }

  nearByUsers = (userId) => {
    API
      .nearbyUsers(userId)
      .then(res => {
        console.log("Res.DAta:    "+res.data);
        this.setState({
          distanceResponse: res.data
        });
      })
  }

  componentDidMount() {
    this.usercheck();
    setTimeout(() => { 
      let uid = this.state.userId;
      this.nearByUsers(uid);
       }, 1000);
  }

  // const nearbyUsers = 
  render () {
    let userId = this.state.userId;
    
    return (
      <div>
        <br />
        <h1 className="is-size-4 has-text-centered">Users near you interested in playing your favorite games</h1>
        <br />
        {/* <p>{userId}</p>
        <p>{JSON.stringify(this.state.distanceResponse)}</p> */}

        <ul className="list">
        {this.state.distanceResponse.map(x => {
          return<li className="list-item is-size-5 has-text-centered" key={JSON.stringify(x.id)}>User {JSON.stringify(x.username)} is {Math.round(x.distanceFrom)} miles away from you in {x.geocodeLocation.city}, {x.geocodeLocation.stateCode}, {x.geocodeLocation.countryCode}.</li>
        })}
        </ul>
      </div>
    );
  }
}

export default NearbyUsers;