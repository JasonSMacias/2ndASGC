import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import API from '../utils/API';
import Modal from './Modal';

class EditProfile extends Component {
  state = {
    userId: "",
    active: "modal",
    allGames: [],
    selectedGames: [],
    modalContent: ""
  }

  usercheck = function() {
    API
      .userCheck()
      .then(res => {
        
        // res is object that can be checked at 3001 api/users/status
        console.log("user check: "+ res.data.id + " " + res.data.username);

        this.setState({
          userId: res.data.id,
          active: "modal"
          });
      })
    
  }

  getAllGames = () => {
    API
      .allGames()
      .then(res => {
        let allG = res.data.map(x => x
        );
        // let allGId = res.data.map(x => x.id);
        this.setState({
          allGames: allG
        });
    })
  }


  onChange = e => {
    const selectedGames = this.state.selectedGames;
    let index;
    console.log(e.target.value);
    if (e.target.checked) {
      selectedGames.push(e.target.value);
    }
    else {
      index = selectedGames.indexOf(e.target.value);
      selectedGames.splice(index, e.target.value.length);
    }
    this.setState({selectedGames: selectedGames})
  }

  close = () => {
    this.setState({active: "modal"});
  }

  mapGames = () => {
    console.log("hi");
  }

  addGames = (e) => {
    e.preventDefault();
    let tempArrary = this.state.selectedGames;
    console.log("TEMPARRAY "+JSON.stringify(tempArrary));
    // let resultArrary = [];
    for (let x of tempArrary) {
      API
        .userUpdate({
          UserId: this.state.userId,
          GameId: x,
        })
        .then(
          (y) => {
            console.log("Y ========== "+y);
            this.setState({
            modalContent: 'Profile Updated.',
            active: 'modal is-active'
            });
          }
        );
      
    }
    // console.log(resultArrary);
  }

  componentDidMount() {
    this.usercheck();
    this.getAllGames();
    // setTimeout(() => { 
    //   let uid = this.state.userId;
    //   this.nearByUsers(uid);
    //    }, 1000);
  }

  // const nearbyUsers = 
  render () {
    let userId = this.state.userId;
    let allGames = this.state.allGames;
    return (
      <React.Fragment>
        <br />
        <h1 className="is-size-5">Select Games That You Are Interested In Playing</h1>
        <br />
        
        {/* <p>{userId}</p>
        <p>{JSON.stringify(allGames)}</p> */}
        
      <form>
        {this.state.allGames.map(x => {
          return<div key={JSON.stringify(x.name)} className="input-group"><label>{JSON.stringify(x.name)}</label><input type="checkbox" value={JSON.stringify(x.id)} onChange={(this.onChange.bind(this))} /></div>
        })}
        
          
        </form>
        
        {/* <div>
          <p>You have chosen :
          {this.state.selectedGames.map(name => 
             <span>{name}, </span>
          )}
          </p>
        </div> */}
          <button className="button is-dark is-rounded" onClick={this.addGames} >Save</button>

          <Modal 
            close={this.close} 
            active={this.state.active} 
            username=''
            prefix=''
            asgc=''
            // modalContent={this.state.modalContent} 
            modalContent={this.state.modalContent}
        />
      </React.Fragment>
    );
  }
}

export default EditProfile;