import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  // Redirect,
} from "react-router-dom";
import {
  Navbar,
  Nav,
  // NavItem,
  NavDropdown,
  // MenuItem,
  // Container,
  // Card,
  // Button
} from "react-bootstrap";
// import {LinkContainer} from 'react-router-bootstrap'

// import Login from './login.js'
import Initialize from './initialize.js'
import Transaction from './transaction.js'
import Report from './report.js'
import HomepageContent from './homepageContent'
import AirportDetails from './airportDetails'
import AircraftDetails from './aircraftDetails'
import TransactionDetails from './transactionDetails'
// import Homepage from './homepage'

function HomePage (props){
  const history = useHistory()
  if(!props.isValid) history.push('/')

  return (
    <Router basename={process.env.PUBLIC_URL}>

    <Navbar sticky="top" collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="#" onClick={e => e.preventDefault()}>Airport Fuel  Management System</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/initialize" className="nav-link">Initialize</Link>
          <Link to="/transaction" className="nav-link">Transaction</Link>
          <Link to="/report" className="nav-link">Report</Link>
          <NavDropdown title="Details" id="basic-nav-dropdown">
            <Link to="/airportDetails" className="dropdown-item">Airport</Link>
            <Link to="/aircraftDetails" className="dropdown-item">Aircraft</Link>
            <NavDropdown.Divider />
            <Link to="/transactionDetails" className="dropdown-item">Transaction</Link>
         </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

      <Switch>

        <Route exact path="/initialize">
          <Initialize/>
        </Route>

        <Route exact path="/transaction" /*component={Transaction}*/ >
          <Transaction/>
        </Route>

        <Route exact path="/report" /*component={Transaction}*/ >
          <Report/>
        </Route>
        <Route exact path="/homepage">
          <HomepageContent/>
        </Route>

        <Route exact path="/airportDetails">
          <AirportDetails/>
        </Route>
        <Route exact path="/aircraftDetails">
          <AircraftDetails/>
        </Route>
        <Route exact path="/transactionDetails">
          <TransactionDetails/>
        </Route>

        {/*<Redirect to="/" component={Login}/>*/}

      </Switch>
    </Router>
  )
}
const mapStateToProps = state => ({
  isValid : state.validUser
  // airportData : state.airportData
})

export default connect(mapStateToProps, null)(HomePage)
