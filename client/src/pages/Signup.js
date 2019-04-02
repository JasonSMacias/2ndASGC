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

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
  }

  register = (e) => {
    e.preventDefault();
    if (this.state.password == this.state.confirmPassword) {
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
          })
          this.activateModal();
          // this.setState({ success: res.data });
          
        })
        .catch(err => console.log(err));
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