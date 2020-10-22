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
    this.state = { forecasts: [],  loading: true };
    this.gettoken = { data: [], loading: true };
    this.getdata = { data: [], loading: true };
    this.XeroAuthSend = this.XeroAuthSend.bind(this);
  }

  XeroAuthSend() {
    // Onclick send client to the xero login link
    console.log(this.state.forecasts.status);
    window.location.href = this.state.forecasts.link;
  }

  componentDidMount() {
    //this.populateWeatherData();

    this.GetLink();
    // if(this.state.forecasts.status == 200)
    // {
    //   window.location.href = this.state.forecasts.link;
    // }
    this.GetToken();
    this.GetData();
  }

  GetLink()
  {
    fetch('https://localhost:5001/get-link', {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
  })
  .then(response => response.json())
    .then((data) => {
      console.log(data);
      this.state = { forecasts: data, loading: false };
    });
  }


  GetToken()
  {
    fetch('https://localhost:5001/showToken', {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
      .then((dataToken) => {
        console.log(dataToken);
        this.gettoken = { data: dataToken, loading: false };
      });
  }

  GetData()
  {
    fetch('https://localhost:5001/showData', {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
      .then((dataXero) => {
        console.log(dataXero);
        this.getdata = { data: dataXero, loading: false };
      });
  }

  // static renderForecastsTable(forecasts) {
  //   //console.log(forecasts);
  //   return (
  //     <div>
  //       <p>{forecasts.status}</p>
  //       <p>{forecasts.link}</p>
  //     </div>
  //   );
  // }

  render() {
    //let contents = this.state.loading ? <p><em>Loading...</em></p> : FetchData.renderForecastsTable(this.state.forecasts); 
    
    return (
        <div>
          <div className="container dasboardContainer">
            <div className="row">
              <div className="col">
                <ProSidebar>
                  <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                    <SubMenu title="Components" icon={<FaHeart />}>
                      <MenuItem>Component 1</MenuItem>
                      <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                  </Menu>
                </ProSidebar>
              </div>
              <div className="col-10">
              <button onClick={this.XeroAuthSend}>Xero Connect</button>
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
          </div>
        </div>
      </div>
    );
  }



  // async populateWeatherData() {
  //   const token = await authService.getAccessToken();
  //   const response = await fetch('weatherforecast', {
  //     headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
  //   });
  //   const data = await response.json();
  //   this.setState({ forecasts: data, loading: false });
  // }
  
  // async populateWeatherData() {
  //   // const token = await authService.getAccessToken();
  //   // const response = await fetch('https://localhost:5001/get-link', {
  //   //   headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
  //   // });
  //   const response = await fetch('https://localhost:5001/get-link')
  //   .then(response => response.json())
  //   //const data = await response.json();
  //   this.setState({ forecasts: response, loading: false });
  // }
}
