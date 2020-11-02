import React from 'react'
import { connect } from 'react-redux'
// import { initializeAirportDetails } from '../redux/action.js'
import { useHistory } from 'react-router-dom';

function Report (props) {
  const history = useHistory()
  if(!props.isValid) history.push('/')



  return(
    <div>

      <div className="container text-left">
        <div>
          <h4> Reports</h4>
        </div>
        <div>
          <span className="lead">Airport Summary Report</span>
        </div>
        <div className="report-background report-font" >
          <div className="row col-md-12">
            <div className="col-md-8 underline">
              <span >Airport</span>
            </div>
            <div className="col-md-4 underline">
              <span > Fuel Available </span>
            </div>
          </div>
          {
            props.airportData.map( (data, index) => {
              return(
                <div key={index} className="row col-md-12">
                      <div  className="col-md-8">
                        <span>{data.airport_name}</span>
                        <span>, </span>
                        <span>{data.location}</span>
                      </div>
                      <div  className="col-md-4">
                        <span>{data.fuel_available}</span>
                      </div>
                </div>
              )
            })
          }
        </div>
        <hr/>

        <div className="row">
          <div className="col-md-12">
            <span className="lead">Fuel Consumption Report</span>
          </div>
          <div className="col-md-12 report-font">
            {
              props.airportData.map((data, index) => {
                return(
                  <div key={index} className="">
                    <div className="report-background"  >
                      <div className="col-md-12">
                        <span>Airport : </span>
                        <span>{data.airport_name}</span>
                        <span>, </span>
                        <span>{data.location}</span>
                      </div>
                    </div>
                    <br/>
                    <div className="report-background">
                      <div className="row font-weight-bold" >
                        <div className="col-md-4">
                          <span>Date/Time</span>
                        </div>
                        <div className="col-md-2">
                          <span>Type</span>
                        </div>
                        <div className="col-md-3">
                          <span>Fuel</span>
                        </div>
                        <div className="col-md-3">
                          <span>Aircraft</span>
                        </div>
                      </div>
                      {
                        props.getTransation.map( (trans, ti) =>{
                          return (trans.tAirportId === data.airport_id &&
                            <div key={ti} className="row">
                              <div className="col-md-4">
                                <span>{(trans.tDateTime).toLocaleDateString()}</span>
                                <span> / </span>
                                <span>{(trans.tDateTime).toLocaleTimeString()}</span>
                              </div>
                              <span className="col-md-2 text-capitalize">{trans.tType}</span>
                              <span className="col-md-3">{trans.tQuantity}</span>
                              <span className="col-md-3">
                                {
                                  ( (trans.tType) === 'out') ? data.aircraft.map((aircraft, ai) => {
                                                                return (aircraft.aircraft_no === trans.tAircraftId &&
                                                                   <span key={ai}>{aircraft.airline}({trans.tAircraftId})</span>
                                                                 )
                                                              })
                                                            : '-'
                                }
                              </span>
                            </div>
                          )
                        })
                      }
                      <br />
                      <div className="row">
                        <span className="col-md-12">Fuel Available : { data.fuel_available }
                        </span>
                      </div>
                    </div>
                    <hr/>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  isValid : state.validUser,
  airportData : state.airportData,
  getTransation : state.transaction,
})
const mapDispatcherToProps = dispatch => {
  return {
    // setData : data => dispatch(initializeAirportDetails(data)),
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(Report)
