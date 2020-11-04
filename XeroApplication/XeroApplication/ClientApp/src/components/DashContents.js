import React, { Component} from 'react';
import {AllInfo,Invoices,TaxValues,Payments,Transactions} from './Views'


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
      const {invoiceData,n,view} = this.state;
      let srted = invoiceData.Invoices;
      let contents;
      
      switch(view){
        case 0:
          if(srted){
              let newData = srted.slice(0,n);
              contents =  AllInfo(newData);
          }else{
              contents = AllInfo(invoiceData.Invoices);
          }
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

      return(
        <div>
         {contents}
        </div>  
      );
    }
  }