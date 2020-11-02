import React from 'react'
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  useHistory,
  // Redirect,
} from "react-router-dom";
import { connect } from 'react-redux'

function AircraftDetails (props) {

  const history = useHistory()
  if(!props.isValid) history.push('/')

  return (
    <div className="container">
      <div>
        <div>
          <h3>Aircraft Details</h3>
        </div>

        <div>
          <table className="table table-striped table-light table-hover shadow rounded">
            <thead>
              <tr className="table-info text-uppercase">
                <th>
                  <span>Id</span>
                </th>
                <th>
                  <span>Aircraft Number</span>
                </th>
                <th>
                  <span>Airlines</span>
                </th>

              </tr>
            </thead>
            <tbody>
              {
                props.airportData.map( (data, index) => {
                  return (
                    data.aircraft.sort((a, b) => (a.aircraft_no > b.aircraft_no) ? 1 : -1).map((aircraft_data, aircraft_index) => {
                      return(
                        <tr className="" key={aircraft_index}>
                          <td className="">{aircraft_data.aircraft_id}</td>
                          <td className="">{aircraft_data.aircraft_no}</td>
                          <td className="">{aircraft_data.airline}</td>
                        </tr>
                      )
                    })
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

const mapStateToProps = state => ({
  isValid : state.validUser,
  airportData : state.airportData,
  // getTransation : state.transaction,
})
const mapDispatcherToProps = dispatch => {
  return {
    // setData : data => dispatch(initializeAirportDetails(data)),
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(AircraftDetails)
