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
        view: newProps.show
      });
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

    render() {
      const {invoiceData,paymentData,transactionData,taxData,n,view} = this.state;
      let contents;
      
      let iloaded = invoiceData.Invoices;
      let ploaded = paymentData.Payments;
      let tloaded = taxData.TaxRates;
      let trloaded = transactionData.BankTransactions;

      if(iloaded && ploaded && tloaded && trloaded ){
       
        let isrted = iloaded.slice(0,n);
        let psrted = ploaded.slice(0,5);
        let tsrted = tloaded.slice(0,n);
        let trsrted = trloaded.slice(0,n);
       
        switch(view){
          case 0:
            contents =  AllInfo(isrted,psrted,tsrted,trsrted);
            break;
          case 1:
            contents =  Invoices(invoiceData.Invoices);
            break;
          case 2:
            contents =  TaxValues(invoiceData.Invoices); 
            break;
          case 3:
            contents =  Payments(invoiceData.Invoices);
            break;
          case 4:
            contents =  Transactions(invoiceData.Invoices); 
            break;
          default:
            contents = "Oops, Something went wrong. Please reload and try again!";
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