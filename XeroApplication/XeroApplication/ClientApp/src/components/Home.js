import { Container } from '@material-ui/core';
import React, { Component } from 'react';

export class Home extends Component {
  static displayName = "Xero Ninja";

  render () {
    return (
      <div>
        <Container>
          <div class="jumbotron align-middle">
            <h1 class="display-4">Welcome to Xero-Ninja!</h1>
            <p class="lead">Your One Stop Solution for compiling all your account information in on easy dashboard!</p>
            <hr class="my-4"/>
            <img className="img-fluid" src={process.env.PUBLIC_URL + '/img/dash.jpg'} />
            <p className="heroText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel molestie enim. Nulla ornare eros risus, at aliquam sapien convallis pulvinar. Cras eu maximus nulla, vitae faucibus lorem. Vestibulum odio mauris, molestie convallis quam vel, tempor ultricies massa. Nulla et magna at turpis vulputate venenatis at vel tortor. Aliquam est ex, cursus id sagittis et, varius placerat urna. Quisque vehicula lacus in nunc faucibus pharetra. Suspendisse tempor nibh ac sodales pellentesque. Morbi dignissim nec nulla ut tincidunt. Aenean laoreet sem vel commodo vulputate. Aenean pharetra massa vitae arcu fermentum tincidunt. Mauris interdum iaculis odio, vel efficitur purus pulvinar quis. Pellentesque congue ultricies elit a ullamcorper.
            Vestibulum eu metus sollicitudin, vestibulum erat non, malesuada eros. Suspendisse nec mauris sollicitudin, tincidunt orci in, consequat eros. Nulla facilisi. Suspendisse potenti. Aliquam et pulvinar sapien. Quisque cursus condimentum magna, non feugiat est convallis non. Ut diam tellus, tincidunt a augue et, maximus aliquet nulla. Suspendisse mattis sed sem vitae iaculis. Suspendisse potenti. Etiam hendrerit eros quis aliquam dignissim.</p>
            <hr class="my-4"/>
            <p class="lead">
              <a class="btn btn-primary btn-lg" href="#" role="button">Get Started!</a>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}
