import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import {CCard, CCardBody, CCardGroup, CCardHeader} from '@coreui/react'
import {CChartDoughnut, CChartLine, CChartRadar} from '@coreui/react-chartjs'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaHeart,FaGem } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';


export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: String, loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  // static renderForecastsTable(forecasts) {
  //   return (
  //       forecasts.json()
  //   );
  // }

  render() {

    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : <p>{this.state.forecasts}</p>;

    return (
        <div>
         <p > {contents} </p>
        </div>
    );
  }

  async populateWeatherData() {
      const response = await fetch('/api/values')
      const data = await response.body;
    this.setState({ forecasts: data, loading: false });
  }
}
