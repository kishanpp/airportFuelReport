import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeAirportDetails } from '../redux/action.js'
import { useHistory } from 'react-router-dom';

function Initialize (props) {
  const history = useHistory()
  if(!props.isValid) history.push('/')

  const airportData = {
    airport : [
      {
        airport_id : 'IXA',
        location : 'Agartala',
        airport_name : 'Singerbhil Airport (IXA)',
        fuel_capacity : 10000,
        fuel_available : 1000,
        aircraft : [
          {
            aircraft_id : 1,
            aircraft_no : '6E 64',
            airline : 'Indigo',
          },
          {
            aircraft_id : 2,
            aircraft_no : '9W2747',
            airline : 'Jet Airways',
          },
        ],
      },
      {
        airport_id : 'AGR',
        airport_name : 'Kheria Airport (AGR)',
        location : 'Agra',
        fuel_capacity : 10000,
        fuel_available : 1000,
        aircraft : [
          {
            aircraft_id : 1,
            aircraft_no : 'UK877',
            airline : 'Vistara',
          },
          {
            aircraft_id : 2,
            aircraft_no : 'AI274',
            airline : 'Air India',
          },
        ]
      },
    ]
  }
  let [airportDetails ,setAirportDetails] = useState([])

  const setDefaultData = async () => {
    await setAirportDetails(airportData.airport);


  }
  useEffect (()=>{
    if(!airportDetails.length) setAirportDetails(props.airportData)
    else props.setData(airportDetails)
  },[airportDetails, props])

  return (
    <div>
      <div>
        <h4>Initialize page</h4>
      </div>
      <div>
        <p>Click the button to initialize the airport details data with the following data</p>
        <div className="container form-group shadow bg-white rounded code-section">
          <pre>
            {airportData.airport && JSON.stringify(airportData.airport, null, 2)}
          </pre>
        </div>
        <div>
          <button className="btn btn-primary" onClick = {setDefaultData}>Initilize</button>
        </div>
        <div>
          <span>{props.airportData.length ? 'Data Initialized succesfully' : ''}</span>
        </div>

      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  isValid : state.validUser,
  airportData : state.airportData
})
const mapDispatcherToProps = dispatch => {
  return {
    setData : data => dispatch(initializeAirportDetails(data)),
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(Initialize)
