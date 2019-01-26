import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      admin: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, password, admin } = this.state;

    axios.post('/api/user/register', { name, password, admin })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { name, password, admin } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Register
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/login"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Login</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="NAME" />
              </div>
              <div class="form-group">
                <label for="title">Password:</label>
                <input type="password" class="form-control" name="password" value={password} onChange={this.onChange} placeholder="PASSWORD" />
              </div>
              <div class="form-group">
                <label for="author">Admin:</label>
                <input type="text" class="form-control" name="admin" value={admin} onChange={this.onChange} placeholder="Admin" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
