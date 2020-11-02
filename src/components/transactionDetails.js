import React, { useState, useEffect } from 'react'
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  useHistory,
  // Redirect,
} from "react-router-dom";
import { connect } from 'react-redux'

import { mergeTransation, updateTransation, updateData } from '../redux/action.js'

function TransactionDetails (props) {

  const history = useHistory()
  if(!props.isValid) history.push('/')

  let [newTransaction, setNewTransaction] = useState({})

  const revertTransaction = currentTransaction => {
    // let revertError = false

    const initialData = props.airportData
    const initialTransation = props.getTransation
    initialData.forEach( (data, index) => {
      if( data.airport_id === props.getTransation[currentTransaction].tAirportId ){

        if(props.getTransation[currentTransaction].tType === 'out'){
          if( (initialData[index].fuel_capacity - initialData[index].fuel_available) < props.getTransation[currentTransaction].tQuantity ){

            alert('Insufficent storage')
          }
          else{
            // setRevertError({})
            initialData[index].fuel_available = (data.fuel_available + props.getTransation[currentTransaction].tQuantity);

            initialTransation[currentTransaction].isReverted = true
            props.updateTransation(initialTransation)
            // create transaction
            setNewTransaction({
              tId : props.getTransation.length + 1,
              tDateTime : new Date(),
              tType : 'in',
              tAirportId : props.getTransation[currentTransaction].tAirportId,
              // tAircraftId : props.getTransation[currentTransaction].tAircraftId,
              tQuantity : props.getTransation[currentTransaction].tQuantity,
              isReverted : false,
            })
            props.updateData(initialData)
          }
        }

        if(props.getTransation[currentTransaction].tType === 'in'){
          if( initialData[index].fuel_available < props.getTransation[currentTransaction].tQuantity ){

            alert('Insufficent Fuel')
          }
          else{
            // setRevertError({})
            initialData[index].fuel_available = (data.fuel_available - props.getTransation[currentTransaction].tQuantity);

            initialTransation[currentTransaction].isReverted = true
            props.updateTransation(initialTransation)
            setNewTransaction({
              tId : props.getTransation.length + 1,
              tDateTime : new Date(),
              tType : 'out',
              tAirportId : props.getTransation[currentTransaction].tAirportId,
              tAircraftId : props.getTransation[currentTransaction].tAircraftId,
              tQuantity : props.getTransation[currentTransaction].tQuantity,
              isReverted : false,
            })
            props.updateData(initialData)
          }
        }
      }

    })
  }
  useEffect( () => {
    if(Object.keys(newTransaction).length){
      props.submitTransaction(newTransaction)

      setNewTransaction([])
    }
  },[newTransaction, props])

  return (
    <div className="container">
      <div>
        <div>
          <h3>Transaction Details</h3>
        </div>

        <div>
          <table className="table table-striped table-light table-hover shadow rounded">
            <thead>
              <tr className="table-info text-uppercase">
                <th>
                  <span>Id</span>
                </th>
                <th>
                  <span>Transaction Type</span>
                </th>
                <th>
                  <span>Date/Time</span>
                </th>
                <th>
                  <span> Quantity</span>
                </th>
                <th>
                  <span>Airport Id</span>
                </th>
                <th>
                  <span>Aircraft Id</span>
                </th>
                <th>
                  <span>Revert Action</span>
                </th>

              </tr>
            </thead>
            <tbody>
              {
                props.getTransation.map( (data, index) => {
                  return (
                    <tr className="" key={index}>
                      <td>{data.tId}</td>
                      <td className="text-uppercase">{data.tType}</td>
                      <td>{data.tDateTime.toLocaleDateString()}/{data.tDateTime.toLocaleTimeString()}</td>
                      <td>{data.tQuantity}</td>
                      <td>{data.tAirportId}</td>
                      {
                        (data.tAircraftId !== undefined) ? <td>{data.tAircraftId}</td> : <td>---</td>
                      }
                      {
                        (data.isReverted
                        ? <td><button className="btn btn-primary" disabled>Reverted</button></td>
                        : <td ><button className="btn btn-primary" onClick={() => revertTransaction(index)  } >Revert</button></td> )
                      }
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
  getTransation : state.transaction,
})
const mapDispatcherToProps = dispatch => {
  return {
    // setData : data => dispatch(initializeAirportDetails(data)),
    updateData : data => dispatch(updateData(data)),
    updateTransation : data => dispatch(updateTransation(data)),
    submitTransaction : data => dispatch(mergeTransation(data)),
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(TransactionDetails)
