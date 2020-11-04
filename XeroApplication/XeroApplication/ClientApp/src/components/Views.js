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

export function AllInfo(data) {
 
     return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <ResponsiveContainer width='100%' height={300}>
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
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <ResponsiveContainer width='100%' height={300}>
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
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className={classes.paper}>
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
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className={classes.paper}>
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
                            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </Paper>
                </Grid>
            </Grid>
        </div>
     );
}

export function Invoices(data) {

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
      
    const rows = [
    createData('The Warehouse', 159, 6.0, 24, 4.0),
    createData('Pak n Save', 237, 9.0, 37, 4.3),
    createData('New World', 262, 16.0, 24, 6.0),
    createData('Countdown', 305, 3.7, 67, 4.3),
    createData('Flight Center', 356, 16.0, 49, 3.9),
    ];

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h5 className="graphTitle">Invoices</h5>
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
                            <Legend width={100} wrapperStyle={{left:600, Color: '#0000000', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                            <Bar dataKey="Total" fill="#0C6E8E" />
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
                                    <TableCell>Company</TableCell>
                                    <TableCell align="right">Profit</TableCell>
                                    <TableCell align="right">Exports</TableCell>
                                    <TableCell align="right">Projected</TableCell>
                                    <TableCell align="right">Actual</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">${row.calories}</TableCell>
                                    <TableCell align="right">${row.fat}</TableCell>
                                    <TableCell align="right">${row.carbs}</TableCell>
                                    <TableCell align="right">${row.protein}</TableCell>
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

export function TaxValues(data) {
    return (<p>Tax Value Placeholder</p>);
}

export function Payments(data) {
    return (<p>Payments Placeholder</p>);
}

export function Transactions(data) {
    return (<p>Transactions Placeholder</p>);
}