import React, { Component} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer, AreaChart, Area, ComposedChart, Line, LineChart
  } from 'recharts';

export class DashContent extends Component {
    static displayName =  DashContent.name;
  
    constructor(props) {
      super(props);
      this.state = { 
        paymentData: [], 
        transactionData: [], 
        taxData: [], 
        invoiceData: [],
        forecasts: [],  
        loading: true, 
        n:10,
        view: props.show
      };
      this.gettoken = { 
        data: [], 
        loading: true 
      };
      this.getdata = {
        data: [],
        loading: true 
      };
    }
      
    componentDidMount() {
      this.GetLink();
      this.GetToken();
      this.GetData();
    }
  
    componentWillReceiveProps(newProps){
      this.setState( { 
        paymentData: [], 
        transactionData: [], 
        taxData: [], 
        invoiceData: [],
        forecasts: [],  
        loading: true, 
        n:10,
        view: newProps.show
      });
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
        this.setState({ forecasts: data, loading: false });
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
      fetch('https://localhost:5001/getInvoices', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
        .then((invoices) => {
          this.setState({ invoiceData: invoices});
        });
  
      
      fetch('https://localhost:5001/getBankTransactions', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
        .then((transactions) => {
          this.setState({ transactionData: transactions});
        });
  
      
      fetch('https://localhost:5001/getPayments', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
        .then((payments) => {
          this.setState({ paymentData: payments});
        });
  
      
      fetch('https://localhost:5001/getTaxRates', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
        .then((taxes) => {
          this.setState({ taxData: taxes, loading:false});
        });
    }
  
  
    static draw(data){
      
      const dummydata = [
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
      
     return(
            <div className="gridContainer">
              <div className="bar">
                <h5 className="graphTitle">Invoices</h5>
                <ResponsiveContainer width='90%' height={200}>
                    <BarChart
                    data={data}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}>
                      <CartesianGrid/>
                      <XAxis dataKey="date" stroke="#000000"/>
                      <YAxis/>
                      <Tooltip dataKey="date" stroke="#000000"/>
                      <Legend width={100} wrapperStyle={{left:600, Color: '#0000000', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                      <Bar dataKey="Total" fill="#0C6E8E" />
                    </BarChart>
                </ResponsiveContainer>
              </div>
  
              <div className="area">
                <h5 className="graphTitle">Tax Values</h5>
                <ResponsiveContainer width='90%' height={200}>
                <AreaChart
                  data={dummydata}
                  margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                  }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
                </ResponsiveContainer>
              </div>
  
              <div className="line">
              <h5 className="graphTitle">Expenditure</h5>
              <ResponsiveContainer width='90%' height={300}>
              <LineChart
                width={500}
                height={300}
                data={dummydata}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
              </ResponsiveContainer>
              </div>
  
              <div className="pie">
              <h5 className="graphTitle">Accounts</h5>
              <ResponsiveContainer width='90%' height={200}>
              <ComposedChart
                width={500}
                height={400}
                data={dummydata}
                margin={{
                  top: 20, right: 80, bottom: 20, left: 20,
                }}
              >
              <CartesianGrid />
                <XAxis dataKey="name" label={{ value: 'Pages', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
              </ResponsiveContainer>
            </div>
        </div>
     );
    }
    
    render() {
      const {invoiceData,n,view} = this.state;
      let srted = invoiceData.Invoices;
      let contents;
      
      switch(view){
        case 0:
          if(srted){
              let newData = srted.slice(0,n);
              contents =  DashContent.draw(newData);
              return(
                <div>
                 {contents}
                </div>  
              );
          }else{
              contents =  DashContent.draw(invoiceData.Invoices);
              return(
                <div>
                 {contents}
                </div>  
              );
          }
  
        case 1:
            contents="Invoice View Placeholder" 
            return(
              <div>
               {contents}
              </div>  
            );


        case 2:
            contents="Transaction View Placeholder" 
            return(
                <div>
                {contents}
                </div>  
            );

        case 3:
            contents="Payment View Placeholder" 
            return(
                <div>
                {contents}
                </div>  
            );
  
        case 4:
            contents="Tax Rate View Placeholder" 
            return(
                <div>
                {contents}
                </div>  
            );

        default:
            contents =  DashContent.draw(invoiceData.Invoices);
            return(
              <div>
               {contents}
              </div>  
          );
      }
    }
  }