import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import {CCard, CCardBody, CCardGroup, CCardHeader} from '@coreui/react'
import {CChartDoughnut, CChartLine, CChartRadar} from '@coreui/react-chartjs'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaHeart,FaGem, FaWindows } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import { Redirect } from 'react-router-dom';


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
    //let contents = this.state.loading ? <p><em>Loading...</em></p> : LoadData.renderRedirect(this.state.forecasts); 
    if (this.state.loading) {
      return <p>Still Loading...</p>;
    }
    else {
      console.log(this.state.forecasts.link);
      window.location.href = this.state.forecasts.link;   // redirect user to xero login
    return (
          <div>
            <p>Loading..... Redirecting</p>
        </div>
      );
    }
  }
}
