import React, { Component,PureComponent } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGitter } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer, AreaChart, Area,
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
    
    const datar = [
      {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
      },
      {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
      },
      {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
      },
      {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
      },
      {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
      },
      {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
      },
      {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
      },
    ];
    
    return (
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
              <div className="flexContainer">
                
                <div className="flexItem">
                  <h1>Invoices</h1>
                  <ResponsiveContainer width='90%' height={600}>
                      <BarChart
                      data={data}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff"/>
                        <XAxis dataKey="date" stroke="#000000"/>
                        <YAxis/>
                        <Tooltip dataKey="date" stroke="#000000"/>
                        <Legend width={100} wrapperStyle={{left:600, Color: '#0000000', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                        <Bar dataKey="Total" fill="#0C6E8E" />
                      </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flexItem">
                  <h1>Tax Values</h1>
                  <ResponsiveContainer width='90%' height={600}>
                  <AreaChart
                    width={500}
                    height={400}
                    data={datar}
                    margin={{
                      top: 10, right: 30, left: 0, bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                  </ResponsiveContainer>
                </div>
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
