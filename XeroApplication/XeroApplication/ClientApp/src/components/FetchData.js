import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import {CCard, CCardBody, CCardGroup, CCardHeader} from '@coreui/react'
import {CChartDoughnut, CChartLine, CChartRadar} from '@coreui/react-chartjs'


export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
    this.XeroAuthSend = this.XeroAuthSend.bind(this);
    this.counter = 0
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  XeroAuthSend() {
    // THIS METHOD NEED TO CALL AUTHORIZATIONCONTROLLER.CS - "INDEX"
    this.counter += 1 
    console.log(this.counter)
  }

static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>String</th>
            <th>Summary</th>
            <th>URL Link</th>
          </tr>
        </thead>
        <tbody>
        <td>{forecasts.date}</td>
        <td>{forecasts.name}</td>
        <td>{forecasts.link}</td>
        </tbody>
      </table>
    );
  }

  // static renderForecastsTable(forecasts) {
  //   return (
  //     <table className='table table-striped' aria-labelledby="tabelLabel">
  //       <thead>
  //         <tr>
  //           <th>Date</th>
  //           <th>Temp. (C)</th>
  //           <th>Temp. (F)</th>
  //           <th>Summary</th>
  //         </tr>
  //       </thead>
        // <tbody>
        //   {forecasts.map(forecast =>
        //     <tr key={forecast.date}>
        //       <td>{forecast.date}</td>
        //       <td>{forecast.temperatureC}</td>
        //       <td>{forecast.temperatureF}</td>
        //       <td>{forecast.summary}</td>
        //     </tr>
        //   )}
        // </tbody>
  //     </table>
  //   );
  // }

  

  render() {
    let contents = this.state.loading ? <p><em>Loading...</em></p> : FetchData.renderForecastsTable(this.state.forecasts);
    return (
        <div>
          <button onClick={this.XeroAuthSend}>Xero Connect</button>

          <p>{contents}</p>
          <CCardGroup>
            <CCard>
              <CCardHeader>
                Line Chart
              </CCardHeader>
              <CCardBody>
                <CChartLine
                  datasets={[
                    {
                      label: 'Data One',
                      backgroundColor: 'rgb(228,102,81,0.9)',
                      data: [30, 39, 10, 50, 30, 70, 35]
                    },
                    {
                      label: 'Data Two',
                      backgroundColor: 'rgb(0,216,255,0.9)',
                      data: [39, 80, 40, 35, 40, 20, 45]
                    }
                  ]}
                  options={{
                    tooltips: {
                      enabled: true
                    }
                  }}
                  labels="months"
                />
              </CCardBody>
            </CCard>
          </CCardGroup>

          <CCardGroup columns className="cols-2">
          
          <CCard>
            <CCardHeader>
              Doughnut Chart
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                datasets={[
                  {
                    backgroundColor: [
                      '#41B883',
                      '#E46651',
                      '#00D8FF',
                      '#DD1B16'
                    ],
                    data: [40, 20, 80, 10]
                  }
                ]}
                labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
            </CCardBody>
          </CCard>

          <CCard>
            <CCardHeader>
              Radar Chart
            </CCardHeader>
            <CCardBody>
              <CChartRadar
                datasets={[
                  {
                    label: '2019',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    tooltipLabelColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 81, 56, 55, 40]
                  },
                  {
                    label: '2020',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    tooltipLabelColor: 'rgba(255,99,132,1)',
                    data: [28, 48, 40, 19, 96, 27, 100]
                  }
                ]}
                options={{
                  aspectRatio: 1.5,
                  tooltips: {
                    enabled: true
                  }
                }}
                labels={[
                  'Eating', 'Drinking', 'Sleeping', 'Designing',
                  'Coding', 'Cycling', 'Running'
                ]}
              />
            </CCardBody>
            </CCard>
        </CCardGroup>
      </div>
    );
  }

  // async populateWeatherData() {
  //   // const token = await authService.getAccessToken();
  //   // const response = await fetch('weatherforecast', {
  //   //   headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
  //   // });
  //   const data =  await fetch('weatherforecast');
  //   this.setState({ forecasts: data, loading: false });
  // }


  async populateWeatherData() {
    const token = await authService.getAccessToken();
    const response = await fetch('weatherforecast', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }

}
