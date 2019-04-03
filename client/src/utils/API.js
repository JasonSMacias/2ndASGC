import axios from 'axios';

export default {
  /* 
    loginCreds = {username: "alex", "password": 12345Password!}
  */
  login: function(loginCreds) {
    return axios.post('/api/users/login', loginCreds)
  },
  /* 
    Path to check if user is logged in
  */
  userCheck: function() {
    return axios.get('/api/users/status')
  },
  /* 
    Path to log out
  */
  logout: function() {
    return axios.get('/api/users/logout')
  },
  /* 
    Path to register new user, you can have more fields than this but "username" and "password" must exist
    userInfo = {
      username: "alex",
      password: 12345Password!
    }
  */
  register: function(userInfo) {
    return axios.post("/api/users", userInfo);
    console.log(userInfo);
  },

  // path to add user geo data to database, uses object with id and address
  addAddress: function (userInfo) {
    console.log("======================Userinfo"+JSON.stringify(userInfo));
    return axios.put("/api/users/geo", userInfo);
  },

  nearbyUsers: function(userId) {
    console.log("User id: " + userId);
    return axios.get("/api/distance/" + userId);
  }
}