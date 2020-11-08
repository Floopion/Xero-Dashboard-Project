import React, { Component} from 'react';
import * as ReactDOM from "react-dom";
import { FaGitter, FaChartBar, FaRegFileAlt,FaHandHoldingUsd,FaFileInvoiceDollar } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import { Collapse, Container, Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import {DashContent}  from './DashContents'

const views =  {
  "all": 0,
  "invoices":1,
  "payments":2,
  "transactions":3
}

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export function FetchData() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3 nav-brand" light>
          <Container className={"unsetMax"}>
              <NavbarBrand tag={Link} to="/">Xero Ninja</NavbarBrand>
                <ul className="navbar-nav flex-grow">
                  <LoginMenu/>
                </ul>
          </Container>
        </Navbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
              <ListItem button onClick={()=>ReactDOM.render(<DashContent show={views.all}/>, document.querySelector('#mainStuff'))} >
                <ListItemIcon>
                  <FaChartBar />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>

              <ListItem button onClick={()=>ReactDOM.render(<DashContent show={views.invoices}/>, document.querySelector('#mainStuff'))}>
                <ListItemIcon>
                 <FaGitter />
                </ListItemIcon>
                <ListItemText primary={"Invoices"} />
              </ListItem>


              <ListItem button onClick={()=>ReactDOM.render(<DashContent show={views.payments}/>, document.querySelector('#mainStuff'))}>
                <ListItemIcon>
                 <FaHandHoldingUsd />
                </ListItemIcon>
                <ListItemText primary={"Payments"} />
              </ListItem>

              <ListItem button onClick={()=>ReactDOM.render(<DashContent show={views.transactions}/>, document.querySelector('#mainStuff'))}>
                <ListItemIcon>
                 <FaRegFileAlt />
                </ListItemIcon>
                <ListItemText primary={"Transactions"} />
              </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content} id={"mainStuff"}>
        <DashContent show={views.all}/>
      </main>
    </div>
  );
}

