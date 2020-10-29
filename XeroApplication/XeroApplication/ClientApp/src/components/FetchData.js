import React, { Component,PureComponent } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGitter } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer,
} from 'recharts';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { data: [], forecasts: [],  loading: true, n:20};
    this.gettoken = { data: [], loading: true };
    this.getdata = { data: [], loading: true };
    this.XeroAuthSend = this.XeroAuthSend.bind(this);
  }

  XeroAuthSend() {
    window.location.href = this.state.forecasts.link;
  }

  componentDidMount() {
    this.GetLink();
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
        this.setState({ data: dataXero, loading: false });
      });
  }


  static draw(data){
    return (
      <div>
        <div className="container dasboardContainer">
          <div className="row">
            <div className="col-2">
              <ProSidebar>
                <Menu iconShape="square">
                  <MenuItem icon={<FaGitter />}>Invoices</MenuItem>
                </Menu>
              </ProSidebar>
            </div>
            <div className="col-10 barChart">
              <h1>Invoices</h1>
              <ResponsiveContainer width='90%' height={600}>
                  <BarChart
                  data={data}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff"/>
                    <XAxis dataKey="date" stroke="#ffffff"/>
                    <YAxis/>
                    <Tooltip dataKey="date" stroke="#ffffff"/>
                    <Legend width={100} wrapperStyle={{left:500, Color: '#ffff', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                    <Bar dataKey="Total" fill="#0C6E8E" />
                  </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  render() {
    const {data,n} = this.state;
    let srted = data.Invoices;
    let contents;
    if(srted){
        let newData = srted.slice(0,n);
        contents = FetchData.draw(newData);
    }else{
        contents = FetchData.draw(data.Invoices);
    }

    return(
      <div>
        {contents}
      </div>  
    );

  }
}
