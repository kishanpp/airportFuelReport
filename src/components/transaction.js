import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { mergeTransation, updateData } from '../redux/action.js'

function Transaction (props) {
  const history = useHistory()
  if(!props.isValid) history.push('/')

  let [transations, setTransactions] = useState([])

  let [tType, setTType] = useState('')
  let [tAirportId, setAirportId] = useState('')
  let [tAircraftId, setAircraftId] = useState('')
  let [tQuantity, setQuantity] = useState('')

  let [aircraftIds, setAircraftIds] = useState([])
  let [error, setError] = useState('')
  let [success, setSuccess] = useState('')
  let [toggleAirportIField, setToggleAirportIField] = useState(false)

  let [tTypeError, setTTypeError] = useState(false)
  let [tAirportIdError, settAirportIdError] = useState(false)
  let [tQuantityError, settQuantityError] = useState(false)
  let [tAircraftError, setTAircraftError] = useState(false)


  const validateFuel = () => {
    let error = false
    props.getInitialize.forEach(data =>
    {
      if(data.airport_id === tAirportId){
        if(tType === 'out')
          if(data.fuel_available >= tQuantity)
          {
            setError('')
          }
          else{
            setError('Fuel Insufficent')
            error = true
          }

        if(tType === 'in')
          if( (data.fuel_capacity - data.fuel_available) >= tQuantity){
            setError('')
          }
          else{
            setError('Fuel Capacity Exceeded !')
            error = true
          }
      }
    })
    return error
  }
  const validateInput = () => {
    let error = false

    if(!tType.length){
      setTTypeError(true)
      error = true
    }
    else{
      setTTypeError(false)
    }

    if(!tAirportId.length){
      settAirportIdError(true)
      error = true
    }
    else{
      settAirportIdError(false)
    }

    if(tQuantity <= 0 ){
      settQuantityError(true)
      error = true
    }
    else{
      settQuantityError(false)
    }

    if(  (tType.length && tType ==='out' && !tAircraftId.length) || ( !tType.length && !tAircraftId.length) ){
      setTAircraftError(true)
      error = true
    }
    else{
      setTAircraftError(false)
    }

    return error
  }
  const addTransaction = () => {
    if(!validateInput()){
      if(validateFuel()){
      }
      else{
        if(tType === 'out')
          setTransactions({
            tId : props.getTransation.length + 1,
            tDateTime : new Date(),
            tType : tType,
            tAirportId : tAirportId,
            tAircraftId : tAircraftId,
            tQuantity : tQuantity,
            isReverted : false,
          })
        if(tType === 'in')
        setTransactions({
          tId : props.getTransation.length + 1,
          tDateTime : new Date(),
          tType : tType,
          tAirportId : tAirportId,
          //tAircraftId : tAircraftId,
          tQuantity : tQuantity,
          isReverted : false,
        })
      }
    }
  }

  useEffect( ()=>{
    if(Object.keys(transations).length){
      props.submitTransaction(transations)
      setSuccess('Transaction successfull')

      const initialData = props.getInitialize
      initialData.forEach( (data, index) => {
        if(data.airport_id === tAirportId)
          initialData[index].fuel_available = (tType === 'out') ? (initialData[index].fuel_available - tQuantity) : (initialData[index].fuel_available + Number(tQuantity));
      })

      props.updateData(initialData)
      setTransactions([])
      setTType('')
      setAircraftId('')
      setAirportId('')
      setQuantity('')
      setTTypeError(false)
      settAirportIdError(false)
      settQuantityError(false)
      setTAircraftError(false)
      setTimeout(()=>(setSuccess('')),2000)
    }
  },[transations, props, tAirportId, tQuantity, tType])

  useEffect( ()=>{
    if(tAirportId.length)
      validateInput()
  },[tAirportId, validateInput])

  const updateAirportId = e => {
    setAirportId(e.target.value)
    setAircraftIds([])
    props.getInitialize.forEach(data =>
    {
      if(data.airport_id === (e.target.value)){
        (data.aircraft).forEach( (item, index) =>{
          setAircraftIds(prevArray => [...prevArray, item.aircraft_no])
            // [...aircraftIds, item.aircraft_id])
        })
      }
    })
  }

  useEffect( ()=>{
    if(tType.length)
      validateInput()
  },[tType])
  const removeAircraft = e => {
    setTType(e.target.value);
    (e.target.value === 'out') ? setToggleAirportIField(true) : setToggleAirportIField(false)

  }

  useEffect( ()=>{
    if(tAircraftId.length)
      validateInput()
  },[tAircraftId])
  const updateAircraftId = e => {
    setAircraftId(e.target.value)
  }

  useEffect( ()=>{
    if(tQuantity > 0)
      validateInput()
  },[tQuantity])
  const updateQuantity = e => {
    setQuantity(Number(e.target.value))
  }

  if(!props.getInitialize.length)
    return (
      <div className="pt-5">
        <h3> Initialize data first</h3>
      </div>
    )

  return (
    <div>
      <div className="container">
        <div className="row form-group">
          <h3 className="col-md-12"> Trasaction Form </h3>
        </div>
        <div className="row form-group">
          <label className="col-md-5">Trasaction Type</label>
          <div className="col-md-5">
            <select className="form-control" onChange = { removeAircraft } value={tType}>
              <option disabled value="">Select transaction type</option>
              <option value="in"> IN </option>
              <option value="out"> OUT </option>
            </select>
          </div>
          <div className="col-md-2">
            { (tTypeError && <span><i className="fas fa-times"></i></span>) }
          </div>
        </div>

        <div className="row form-group">
          <label className="col-md-5">Select Airport</label>
          <div className="col-md-5">
            <select className="form-control" onChange = {updateAirportId} value={tAirportId}>
              <option disabled value="">Select Airport</option>
              {
                props.getInitialize.map( data =>
                  <option key={data.airport_id} value={data.airport_id}>{data.airport_name}</option>
                )
              }
            </select>
          </div>
          <div className="col-md-2">
            <span>{tAirportIdError === true && <i className="fas fa-times"></i>}</span>
          </div>
        </div>

        {(toggleAirportIField === true &&
          <div className="row form-group">
            <label className="col-md-5">Select Aircraft</label>
            <div className="col-md-5">
              <select className="form-control" value={tAircraftId} onChange = {updateAircraftId}>
                <option disabled value="">Select Aircraft</option>
                {aircraftIds.map(data =>
                  <option key={data} value={data}>{data}</option>
                )}
              </select>
            </div>
            <div className="col-md-2">
              <span>{tAircraftError === true && <i className="fas fa-times"></i>}</span>
            </div>
          </div>
        )}

        <div className="row form-group">
          <label className="col-md-5">Fuel Quantity</label>
          <div className="col-md-5">
            <input className="form-control" placeholder="Enter fuel quantity" type="number" onChange = { updateQuantity} value={tQuantity}/>
          </div>
          <div className="col-md-2">
            <span>{tQuantityError === true && <i className="fas fa-times"></i>}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
          </div>
          <div className="col-md-5 text-right">
            <button className="btn btn-primary" onClick={addTransaction}>Submit</button>
          </div>
        </div>
        <div>
          {error.length ? error : ''}
          {success.length ? success : ''}
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isValid : state.validUser,
  getTransation : state.transaction,
  getInitialize : state.airportData,
})

const mapDispatcherToProps = dispatch => {
  return {
    submitTransaction : data => dispatch(mergeTransation(data)),
    updateData : data => dispatch(updateData(data)),
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(Transaction)
