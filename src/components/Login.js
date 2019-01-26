import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        this.props.history.push("/app")
      }).
      catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { name, password } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Login
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/register"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Register</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="NAME" />
              </div>
              <div class="form-group">
                <label for="title">Password:</label>
                <input type="password" class="form-control" name="password" value={password} onChange={this.onChange} placeholder="PASSWORD" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
