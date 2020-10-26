import React, { Component,PureComponent } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGitter } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

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


  render() {
    //let contents = this.state.loading ? <p><em>Loading...</em></p> : FetchData.renderForecastsTable(this.state.forecasts); 
    const {data} = this.state;
    return (
        <div>
          <div className="container dasboardContainer">
            <div className="row">
              <div className="col">
                <ProSidebar>
                  <Menu iconShape="square">
                    <MenuItem icon={<FaGitter />}>Invoices</MenuItem>
                  </Menu>
                </ProSidebar>
                <div className="col-10">
                  <BarChart
                  width={700}
                  height={500}
                  data={data}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="InvoiceNumber" />
                    <YAxis dataKey="" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total" fill="#82ca9d" />
                  </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
