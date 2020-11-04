import React, { Component } from 'react';

export class LoadData extends Component {
  static displayName = LoadData.name;

  constructor(props) {
    super(props);
    let temper = {status: 404, link: "https://localhost:5001/load-data"};
    this.state = { forecasts: [],  loading: true };
    this.gettoken = { data: [], loading: true };
    this.getdata = { data: [], loading: true };
    this.XeroAuthSend = this.XeroAuthSend.bind(this);
  }

  XeroAuthSend() {
    // Onclick send client to the xero login link
    console.log(this.state.forecasts.status);
    //window.location.href = this.state.forecasts.link;

    //return this.state.forecasts.link;
    console.log(this.state.forecasts.link);
  }

  componentDidMount() {
    //this.populateWeatherData();
    
    this.GetLink();
  }

  async GetLink()
  {
    await fetch('https://localhost:5001/get-link', {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
  })
  .then(response => response.json())
    .then((data) => {
      //console.log(data);
      this.setState({ forecasts: data, loading: false });
    });
  }


  render() {
    if (this.state.loading) {
      return <img className="ajax-loader" src={process.env.PUBLIC_URL + '/img/ajax-loader.gif'} />;
    }
    else {
      console.log(this.state.forecasts.link);
      window.location.href = this.state.forecasts.link;   // redirect user to xero login
    return (
          <div>
            <img className="ajax-loader" src={process.env.PUBLIC_URL + '/img/ajax-loader.gif'} />
        </div>
      );
    }
  }
}
