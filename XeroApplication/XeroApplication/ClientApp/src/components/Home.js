import { Container } from '@material-ui/core';
import React, { Component } from 'react';

export class Home extends Component {
  static displayName = "Xero Ninja";

  render () {
    return (
        <div class="container-fluid startscreen">
            <div class="site-name">
              <h1><span class="smaller">Xero-Ninja</span></h1>
              <p>Your Accounts made easy.</p>
            </div>
            <div class="login">
              <a href="https://studio5.xdashboard.ninja/Identity/Account/Register?returnUrl=/authentication/login" class="btn btn-primary btn-lg join-link">Join us</a>
              <p>Already registered?</p>
              <a href="https://studio5.xdashboard.ninja/authentication/login" class="login-link">Login</a>
            </div>
        </div>
    );
  }
}

