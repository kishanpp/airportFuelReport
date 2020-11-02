import React from 'react';
import Login from './components/login.js'
import Homepage from './components/homepage.js'
import Initialize from './components/initialize.js'
import Transaction from './components/transaction.js'
import Report from './components/report.js'
import AirportDetails from './components/airportDetails'
import AircraftDetails from './components/aircraftDetails'
import TransactionDetails from './components/transactionDetails'

import '@fortawesome/fontawesome-svg-core/styles.css'
// import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';
import './app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // HashRouter,
} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>

          <Route path='/homepage' component={Homepage} />
          <Route path='/initialize' component={Initialize} />
          <Route path='/transaction' component={Transaction} />
          <Route path='/report' component={Report} />
          <Route path="/airportDetails" component={AirportDetails}/>
          <Route path="/aircraftDetails" component={AircraftDetails}/>
          <Route path="/transactionDetails" component={TransactionDetails}/>


        </Switch>
      </Router>

    </div>
  );
}

export default App;
