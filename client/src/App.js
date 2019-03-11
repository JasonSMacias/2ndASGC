import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Masthead from './components/Masthead';
import Home from './pages/Home';
import Games from './pages/Games';
import GamesSites from './pages/GameSites';
import UserDashboard from './pages/UserDashboard';
import Members from './pages/Members';
import API from './utils/API';
import Signup from './pages/Signup';
import Axios from 'axios';

class App extends Component {
  state = { 
    isLoggedIn: false,
    userName: "",
    loginBoxPresent: true
     }
  
// to get users: {this.state.users.map(user => <li key={user.id}>{user.user_name}, {user.address}</li>)}


    // Check login status on load
  // componentDidMount() {
  //   this.loginCheck();
  // }
  // Check login status
  // loginCheck = () => {
  //   API
  //     .loginCheck()
  //     .then(res => this.setState({
  //       isLoggedIn: res.data.isLoggedIn, username: res.data.username
  //     }))
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({isLoggedIn: false})
  //     })
  // }

  render() {
    // if (this.state.isLoggedIn) {
    //   return <Redirect to="/"/>
    // }
    return (
      <Router>
        <React.Fragment>
          <Masthead loginBoxPresent={this.state.loginBoxPresent} />
            <section className="section">
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  
                  <Route exact path="/games" component={Games} />
                  <Route exact path="/game-sites" component={GamesSites} />
                  <Route exact path="/dashboard" component={UserDashboard} />
                  <Route exact path="/members" component={Members} />
                  <Route exact path="/signup" component={Signup} loginBoxPresent={this.state.loginBoxPresent} />
                </Switch>
              </div>
            </section>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
