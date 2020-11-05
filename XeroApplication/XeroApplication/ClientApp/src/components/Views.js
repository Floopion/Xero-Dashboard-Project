import React, { Component} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer, AreaChart, Area, ComposedChart, Line, LineChart
  } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FaGitter, FaChartBar, FaRegFileAlt,FaHandHoldingUsd,FaFileInvoiceDollar } from 'react-icons/fa';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const classes = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
      },
}));

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

export function AllInfo(invoiceData,payData,taxData,transData) {

     return(
        <div className={classes.root}>
           
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <FaGitter />
                            }
                            title="Latest 10 Invoices"
                        />
                        <CardContent>
                                <ResponsiveContainer width='100%' height={300}>
                                    <BarChart
                                    data={invoiceData}
                                    margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                    }}>
                                    <CartesianGrid/>
                                    <XAxis dataKey="Contact.Name" stroke="#000000" />
                                    <YAxis dataKey="Total" stroke="#000000" label={{ value: 'Total Spent', angle: -90, position: 'insideLeft' }}/>
                                    <Tooltip dataKey="Date" stroke="#000000"/>
                                    <Legend width={170} wrapperStyle={{Color: '#0000000', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} position="insideBottom" />
                                    <Bar name="Invoice Total ($)" dataKey="Total" fill="#0C6E8E"/>
                                    </BarChart>
                                </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <FaRegFileAlt />
                            }
                            title="Expenditure (Dollars)"
                        />
                        <CardContent>
                            <ResponsiveContainer width='100%' height={300}>
                                <AreaChart
                                data={transData}
                                margin={{
                                    top: 10, right: 30, left: 0, bottom: 0,
                                }}
                                >
                                <CartesianGrid />
                                <XAxis dataKey="Contact.Name" name="Contact Name"  />
                                <YAxis  dataKey="Total" name="Total Expediture ($)"/>
                                <Tooltip dataKey="Date" stroke="#000000" />
                                <Area type="monotone" dataKey="Total" stroke="#32465A" fill="#0C6E8E" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <FaFileInvoiceDollar />
                            }
                            title="Total Taxed"
                        />
                        <CardContent>
                            <ResponsiveContainer width='100%' height={300}>
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
                                    <Line type="monotone" dataKey="pv" stroke="#32465A" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="uv" stroke="#32465A" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>



                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <FaHandHoldingUsd />
                            }
                            title="Latest Payments"
                        />
                        <CardContent>
                        <ResponsiveContainer width='100%' height={300}>
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
                                <Area type="monotone" dataKey="amt" fill="#32465A" stroke="#32465A" />
                                <Bar dataKey="pv" barSize={20} fill="#32465A" />
                                <Line type="monotone" dataKey="uv" stroke="#32465A" />
                            </ComposedChart>
                        </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
     );
}
 
export function Invoices(data) {
    
    function DateFormat(dateInput){
        let  date = new Date(dateInput);
        let  year = date.getFullYear();
        let  month = date.getMonth()+1;
        let  dt = date.getDate();
         
         if (dt < 10) {
           dt = '0' + dt;
         }
         if (month < 10) {
           month = '0' + month;
         }
         
         let dateString = dt+'-' + month + '-'+year;
     
         return dateString;
     }
 
    if (data){
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h5 className="graphTitle">All Invoices</h5>
                            <ResponsiveContainer width='100%' height={400}>
                                <BarChart
                                data={data}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}>
                                <CartesianGrid/>
                                <XAxis dataKey="date" stroke="#000000"/>
                                <YAxis/>
                                <Tooltip dataKey="date" stroke="#000000"/>
                                <Legend width={170} wrapperStyle={{left:600, Color: '#0000000', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                                <Bar dataKey="Total" fill="#0C6E8E" name="Invoice Total ($)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Contact Name</TableCell>
                                        <TableCell align="right">Due Date</TableCell>
                                        <TableCell align="right">Currency</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                        <TableCell align="right">AmountDue</TableCell>
                                        <TableCell align="right">AmountPaid</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {data.map((data) => (
                                        <TableRow key={data.InvoiceID}>
                                        <TableCell component="th" scope="row">
                                            {data.Contact.Name}
                                        </TableCell>
                                        <TableCell align="right">{DateFormat(data.DueDateString)}</TableCell>
                                        <TableCell align="right">{data.CurrencyCode}</TableCell>
                                        <TableCell align="right">{data.Type}</TableCell>
                                        <TableCell align="right">${data.AmountDue}</TableCell>
                                        <TableCell align="right">${data.AmountPaid}</TableCell>
                                        <TableCell align="right">${data.Total}</TableCell>
                                        <TableCell align="right">{data.Status}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>    
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export function TaxValues(data) {
    return (<p>Tax Value Placeholder</p>);
}

export function Payments(data) {
    return (<p>Payments Placeholder</p>);
}

export function Transactions(data) {
    return (<p>Transactions Placeholder</p>);
}