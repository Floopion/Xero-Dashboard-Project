import React, { Component} from 'react';
import {AllInfo,Invoices,TaxValues,Payments,Transactions} from './Views'
import { Container } from '@material-ui/core';


export class DashContent extends Component {
    static displayName =  DashContent.name;
  
    constructor(props) {
      super(props);
      this.state = { 
        paymentData: [], 
        transactionData: [], 
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
        view: newProps.show
      });
    }
  
    GetLink()
    {
      fetch('https://studio5.xdashboard.ninja/get-link', {
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
      fetch('https://studio5.xdashboard.ninja/showToken', {
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
      fetch('https://studio5.xdashboard.ninja/getInvoices', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
        .then((invoices) => {
          this.setState({ invoiceData: invoices});
        });
  
      
      fetch('https://studio5.xdashboard.ninja/getBankTransactions', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
        .then((transactions) => {
          this.setState({ transactionData: transactions});
        });
  
      
      fetch('https://studio5.xdashboard.ninja/getPayments', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
        .then((payments) => {
          this.setState({ paymentData: payments});
        });
  
    }

    render() {
      const {invoiceData,paymentData,transactionData,n,view} = this.state;
      let contents;
      
      let iloaded = invoiceData.Invoices;
      let ploaded = paymentData.Payments;
      let trloaded = transactionData.BankTransactions;

      if(iloaded && ploaded && trloaded ){
       
        let isrted = iloaded.slice(0,n);
        let psrted = ploaded.slice(0,5);
        let trsrted = trloaded.slice(0,n);
       
        switch(view){
          case 0:
            contents =  AllInfo(isrted,psrted,trsrted);
            break;
          case 1:
            contents =  Invoices(invoiceData.Invoices);
            break;
          case 2:
            contents =  Payments(paymentData.Payments);
            break;
          case 3:
            contents =  Transactions(transactionData.BankTransactions); 
            break;
          default:
            contents = <p>Oops, Something went wrong. Please reload and try again!</p>;
          break;
        }
      }else{
        contents = <Container><img className="ajax-loader" src={process.env.PUBLIC_URL + '/img/ajax-loader.gif'} /><p>Loading Dashboard</p></Container>
      } 

      return(
        <div>
         {contents}
        </div>  
      );
    }
  }
