import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import Modal from '../components/Modal';

class Signup extends Component {
  
  state = {
    success: false,
    username: '',
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    active: 'modal',
    prefix: '',
    asge: '',
    modalContent: '',
  }

  setLoggedIn = (e) => {
    this.props.setLoggedIn(e);
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
  }


  register = (e) => {
    e.preventDefault(); 
    let emailCheck = this.state.email;
    let usernameCheck = this.state.username;
    let nameCheck = this.state.name;
    let passwordCheck = this.state.password;
    let addressCheck = this.state.address;
    // validating signup input
    if (this.state.password === this.state.confirmPassword && emailCheck.match(/\S+@\S+/) && usernameCheck.length > 0 &&usernameCheck.length < 256 && nameCheck.length > 0 && nameCheck.length < 256 && passwordCheck.length > 0 && passwordCheck.length < 256 && addressCheck.length > 0 && addressCheck.length < 256 && emailCheck.length < 256) {
      API
        .register({ 
          username: this.state.username,
          name: this.state.name,
          email: this.state.email,
          address: this.state.address,
          password: this.state.password 
          }) 
        .then(res => {
          console.log("returned from register"+JSON.stringify(res.data));
          console.log("this.state.address from signup"+this.state.address);
          let idAddress = {address: this.state.address, id: res.data.id};
          console.log("idAddress: "+JSON.stringify(idAddress));
          API
            .addAddress(idAddress)
            .then(console.log("addAddress api call returned"))
            .catch(err => console.log(err));
          this.setState({
            asgc: 'Abstract Strategy Gamers Club',
            modalContent: 'Sign up successful.',
            prefix: 'Welcome to the '
          });
          console.log(this.props.setLoggedIn);

          //removed setting login here for now until rest of state info is lifted
          // this.setLoggedIn(true);
          this.activateModal();

          // this.setState({ success: res.data });
          
        })
        .catch(err => console.log(err));
    }
    // very basic regex email validation
    else if (!emailCheck.match(/\S+@\S+/)) {
      this.setState({
        modalContent: 'Please enter a valid email.',
        prefix: '',
        asgc: ''
      });
      this.activateModal();
    }
    else if (!usernameCheck || !nameCheck || !passwordCheck || !addressCheck) {
      this.setState({
        modalContent: 'Name, Username, Address, and Password fields are required.',
        prefix: '',
        asgc: ''
      })
      this.activateModal();
    }
    else if (usernameCheck.length > 256 || nameCheck.length > 256 || passwordCheck.length > 256 || emailCheck.length > 256 ||addressCheck.length > 256) {
      this.setState({
        modalContent: 'Name, Username, Email, Address, and Password fields have a maximum length of 255 characters.',
        prefix: '',
        asgc: ''
      })
      this.activateModal();
    }
    else {
      this.setState({
        modalContent: 'Passwords do not match.',
        prefix: '',
        asgc: ''
      })
      this.activateModal();
    }
  }

  close = () => {
    this.setState({active: "modal", success: true});
  };

  activateModal = () => {
    this.setState({
      active: "modal is-active",
      });
  };


  render() {
    if (this.state.success) {
      
      return <Redirect to ="/" />
    }

    return (
      <React.Fragment>
      <form className="field is-grouped-multiline box">
        <label className="label" htmlFor="username">Username</label>
        <div className="control">
          <input
            type="text"
            name="username"
            onChange={this.handleInputChange}          
            className="input is-dark is-rounded"
            placeholder="Username" />
          
        </div>
        <br />
        <label className="label" htmlFor="name">Name</label>
        <div className="control">
          <input
            type="text"
            name="name"

            onChange={this.handleInputChange}
            className="input is-dark is-rounded"
            placeholder="Name" />
          
        </div>
        <br />
        <label className="label" htmlFor="email">Email</label>
        <div className="control">
          <input
            type="email"
            name="email"

            onChange={this.handleInputChange}
            className="input is-dark is-rounded"
            placeholder="Email" />
          
        </div>
        <br />
        <label className="label" htmlFor="address">Address</label>
        <div className="control">
          <input
            type="text"
            name="address"

            onChange={this.handleInputChange}

            className="input is-dark is-rounded"
            placeholder="Address" />
        
        </div>
        <br />
        <label className="label" htmlFor="password">Password  </label>
        <div className="control is-medium">
          <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
            className="input is-dark is-rounded"
            placeholder="Password"
          />
        </div>
        <br />
        <label className="label" htmlFor="confirmPassword">Confirm Password  </label>
        <div className="control is-medium">
          <input
            type="password"
            name="confirmPassword"
            onChange={this.handleInputChange}
            className="input is-dark is-rounded"
            placeholder="Password"
          />
        </div>
        <br />
        <div>* Only your Username will be visible to others by default.</div>
        <br />
        <div className="control">
          <button type="submit" className="button is-dark is-rounded" onClick={this.register} >Sign Up</button>
        </div>
      </form>
      <Modal 
      close={this.close} 
      active={this.state.active} 
      prefix={this.state.prefix}
      asgc={this.state.asgc}
      username={this.state.username}
      
      modalContent={this.state.modalContent}
      />
      </React.Fragment>
    );
  }
}

export default Signup;