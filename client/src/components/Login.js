import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import API from '../utils/API';
import Modal from './Modal';

class Login extends Component {

    state = {
      // isLoggedIn: false,
      password: "",
      email: "",
      active: "modal",
      modalContent: "",
      username: "",
      geocodeLocation: {},
      name: "",
    }

  setLoggedIn = (e) => {
    this.props.setLoggedIn(e);
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

 // Method to handle user login, should redirect to main page when done
  login = (e) => {
    e.preventDefault();
    API
      .login({email: this.state.email, password: this.state.password})
      .then(res => {
        console.log(res.data);
        // testing changing grandparent state here
        this.setLoggedIn(true);
        // this.setState({isLoggedIn: this.props.isLoggedIn});
        this.usercheck();
      })
      .catch(err => {
        console.log(err.response);
        this.setState({
          modalContent: 'Incorrect email or password.',
          active: 'modal is-active'
          })  
      });
  }

  logout = (e) => {
    e.preventDefault();
    API
      .logout()
      .then(res => {
        // this.setState({isLoggedIn: false});
        this.setState({modalContent: "Logged out"});
        this.setState({active: 'modal is-active'})
      })
      .then(res => {
        // testing setting grandparent state here
        this.setLoggedIn(false);
        // this.setState({isLoggedIn: this.props.isLoggedIn});
        this.setState({password: ""})
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  usercheck = function() {
    API
      .userCheck()
      .then(res => {
        // Start here ====================================================================
        // res is object that can be checked at 3001 api/users/status
        console.log("user check: "+ res.data.id + " " + res.data.username);
        this.setState({
          username: res.data.username,
          geocodeLocation: res.data.geocodeLocation,
          name: res.data.name,
          });
      })

  }

  close = () => {
    this.setState({active: "modal", success: true});
  }

  componentDidMount() {
    // If user is logged in, take them to main page
    if (this.state.isLoggedIn) {
      console.log("it worked");
      this.usercheck();
      // return <Redirect to ="/dashboard" />
    }

  }

  render () {
    return (
      <React.Fragment>
        {/* <p>Sign in stuff OR basic member information <br /> and link to dashboard</p>     */}
        {!this.props.isLoggedIn ?
          <React.Fragment>
          <div className="level-right">
            <div className="level-item">
              <form className="field is-grouped-multiline box">
                <label className="label" htmlFor="email">Email </label>
                <div className="control">
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    className="input is-dark is-rounded"
                    placeholder="Email"
                  />
                </div>
                <br />
                <label className="label" htmlFor="password">Password  </label>
                <div className="control is-medium">
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    className="input is-dark is-rounded"
                    placeholder="Password"
                  />
                </div>
                <br />
                <div className="level">
                  {/* <div className="control"> */}
                    <div className="level-left">
                      <button type="submit" className="button is-dark is-rounded" onClick={this.login}>Log in</button>
                    </div>
                    <div className="level-right">
                      <Link to="/signup" className="button is-dark is-rounded">Sign up</Link>
                    </div>
                  {/* </div> */}
                </div>
              </form>

            </div>
          </div>
          <Modal 
          close={this.close} 
          active={this.state.active} 
          username={this.state.username}
          prefix=''
          asgc=''
          // modalContent={this.state.modalContent} 
          modalContent={this.state.modalContent}
          />
          </React.Fragment>
        :
          <div className="level-right">
            <div className="level-item">
              <section className="field is-grouped-multiline box">

                {/* <div>
                  City: {this.state.geocodeLocation ? this.state.geocodeLocation.city : "City not found"} <br />
                  Latitude and Longitude: {this.state.geocodeLocation ?this.state.geocodeLocation.latitude : "coordinates"}, {this.state.geocodeLocation ?this.state.geocodeLocation.longitude : "not found"}
                </div> */}
                
                  <div className="columns is-mobile">
                    <div className="column">
                      <ul>
                        <li>
                          <Link to='/dashboard' className="lnk is-size-5">Dashboard</Link>
                        </li>
                        <br />
                        <li>
                          <Link to='/dashboard' className="lnk is-size-5">Nearby Users</Link>
                        </li>
                        <br />
                        <li>
                          <Link to='/dashboard' className="lnk is-size-5">Edit Profile</Link>
                        </li>
                        <br />
                      </ul>
                    </div>
                    <div className="column">
                      <ul>
                        <li>
                          <span className="">Name: </span><br />{this.state.name}
                        </li>
                        <li>
                          Username:<br /><Link to='/dashboard' className="lnk">{this.state.username}</Link>
                        </li>
                        <li>
                          Email:<br />{this.state.email}
                        </li>
                        <li>
                          City:<br />{this.state.geocodeLocation ? (this.state.geocodeLocation.city + ", " + this.state.geocodeLocation.stateCode + ", " + this.state.geocodeLocation.countryCode) : "City not found"}
                        </li>
                        <li>
                          <Link to='/dashboard' className="lnk"></Link>
                        </li>
                        <li>
                          <Link to='/dashboard' className="lnk"></Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                <div className="control">
                  <button type="submit" className="button is-dark is-rounded" onClick={this.logout}>Logout</button>
                </div>
              </section>

            </div>
          </div>
        }
        
      </React.Fragment>
    );
  }
}

export default Login;