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

function AirportDetails (props) {

  const history = useHistory()
  if(!props.isValid) history.push('/')

  return (
    <div className="container">
      <div>
        <div>
          <h3>Airport Details</h3>
        </div>
        <div>
          <table className="table table-striped table-light table-hover shadow rounded">
            <thead>
              <tr className="table-info text-uppercase">
                <th>
                  <span>Id</span>
                </th>

                <th>
                  <span>Airport Name</span>
                </th>
                <th>
                  <span>Airport location</span>
                </th>
                <th>
                  <span>Fuel Available</span>
                </th>
                <th>
                  <span>Fuel Capacity</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                props.airportData.sort((a, b) => (a.airport_name > b.airport_name) ? 1 : -1).map( (data, index) => {
                  return (
                    <tr className="" key={index}>
                      <td className="">{data.airport_id}</td>
                      <td className="">{data.airport_name}</td>
                      <td className="">{data.location}</td>
                      <td className="">{data.fuel_available}</td>
                      <td className="">{data.fuel_capacity}</td>
                    </tr>
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

export default connect(mapStateToProps, mapDispatcherToProps)(AirportDetails)
