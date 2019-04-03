import React, {Component} from 'react';
import { Link } from "react-router-dom";
import API from '../utils/API';

class NearbyUsers extends Component {
  state = {
    userId: ""
  }
  usercheck = () => {
    const checkUserId = API
      .userCheck()
      .then(res => {
        
        // res is object that can be checked at 3001 api/users/status
        console.log("user check: "+ res.data.id + " " + res.data.username);

        this.setState({
          userId: res.data.id,
          });
      })
    
  }

  componentDidMount() {
    // If user is logged in, take them to main page
    
      console.log("it worked");
      this.usercheck();
      // return <Redirect to ="/dashboard" />

  }

  // const nearbyUsers = 
  render () {
    let userId = this.state.userId;
    return (
      <div>

        <h1>Nearby Users Filler</h1>

        <p>This will have general info with a hamburger menu upper left</p>

        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem minus ea possimus debitis maxime minima, consequatur fuga natus rem dignissimos adipisci quasi pariatur vero sint, dolore voluptate excepturi nostrum ducimus.</p>

        <p>{userId}</p>
          
      </div>
    );
  }
}

export default NearbyUsers;