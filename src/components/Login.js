import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';


class Login extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      password: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, password } = this.state;

    axios.post('/api/user/authenticate', { name, password })
        .then((result) => {
            localStorage.setItem('jwtToken', result.data.token);
            localStorage.setItem('name', result.data.name);
            if(result.data.success==true){
              this.setState({ message: '' });
              this.props.history.push("/app");
            }
        else {
          this.setState({ message: 'Login failed. Username or password not match' });
          this.props.history.push("/");

        }
      });
  }

  render() {
    const { name, password, message } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          {message !== '' &&
            <div class="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          }
          <h2 class="form-signin-heading">Please sign in</h2>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="text" class="form-control" placeholder="Email address" name="name" value={name} onChange={this.onChange} required/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <p>
            Not a member? <Link to="/register"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
