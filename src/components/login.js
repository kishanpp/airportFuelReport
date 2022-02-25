import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../redux/action.js'
import { useHistory } from 'react-router-dom';
import '../css/login.css'
function Login (props){

  let [user_name, setUserName] = useState('')
  let [user_password, setUserPassword] = useState('')
  let [error, setError] = useState('')

  let [userNameError, setUserNameError] = useState(false)
  let [userPasswordError, setUserPasswordError] = useState(false)
  const history = useHistory()

  const validateUser = () => {
    // call redux and set validUser to true
    if(!validateInput())
    if(validUser()){
      props.login()
      history.push('/homepage')
    }
    else{
      setError('Invalid user')
    }
  }


  const validateInput = () => {
    let error = false
    if(!user_name.length){
      error = true
      setUserNameError(true)
    }
    else{
      setUserNameError(false)
    }

    if(!user_password.length){
      error = true
      setUserPasswordError(true)
    }
    else{
      setUserPasswordError(false)
    }
    return error
  }

  useEffect( () =>{
    if(user_name.length)
      validateInput()
  },[user_name, props])
  const updateUserName = e => {
    setUserName(e.target.value)
  }

  useEffect( () =>{
    if(user_password.length)
      validateInput()
  },[user_password])
  const updatePassword = e => {
    setUserPassword(e.target.value)
  }

  const validUser = () => {
    let valid = false
    if(props.userData.userName === user_name && props.userData.userPassword === user_password) valid = true
    return valid
  }

  return(
    <div className="form">
      <div className="form-signin">
        <div>
          <div className="mb-5">
            <h4 className="h3 mb-3 font-weight-normal font-weight-bold text-uppercase">User Login</h4>
          </div>
          <div>
            <span>
              {
                error && error.length &&
                  <span className="text-uppercase">
                    <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABoElEQVQ4jd2Tz0uUURSGn3O/X2omthsCEwo3SZagRdPCrSRtbR2R5NJ1IrZp0SIIEhwhcN02JGsjtHAVI276C/oDMiXBO963RTP6Od+oM7iJzupyznuf+557z4X/IrRBrzbobUfrzoVt0i2fVeWzqjbpvjAw7HXNA0OIobDb9eI8vZ3pbj0dlrMqIq1naiaN2aTf7tihFnFyVsnBAGKZVbR4+r7TWy5nM4gHAE/fj/Fk5U6jco9y8qwjoNYulSR71XC2u+/4fRAd12Wv9aXnatvAkBy+hXCl3iZJ5EmjWl7SF0LtTVtArWeTpjCdz8XmSSKfE4HBY33OHp0J1Ed6ZFpqFiXOkzaAyumld80DfwIY0vQlcL0ZODq4w+2BXydg9bgWDtKFfOJoDvUpHZHjG5A07/r6/TKSmLi5VyCCaha4aw/91pHDvzPHcitYCMbcaom51RKHoQADiOWo6AMRQAxAOZtFul88HJyJ5ZkfSCJyBVhjOU5f8hz8UgwQxEjhD+b04zf2WxdzmiBuQf0OJYw1+gsOO4kpfpq1eLZ/Lv4A0+aZ4wYyFLEAAAAASUVORK5CYII="/>
                    {error}
                  </span>
              }
            </span>
          </div>
          <div >
            <div className="md-form input-with-post-icon">
              <i className="fas fa-user input-prefix"></i>
              <input type="text" id="inputUsername" placeholder="Username" className="form-control" onChange = {updateUserName}  value={user_name}/>

            </div>
            <span className="user-validation-error">
              {userNameError && <span><i className="fas fa-times"></i></span>}
            </span>
          </div>

          <div className="mb-3">
            <div className="md-form  input-with-post-icon">
              <i className="fas fa-lock input-prefix"></i>
              <input type="password" id="inputPassword" placeholder="Password" className="form-control" onChange = {updatePassword} value={user_password}/>

            </div>
            <span className="user-validation-error">
              {userPasswordError && <span><i className="fas fa-times"></i></span>}
            </span>
          </div>

        </div>
        <button className="btn btn-lg btn-primary btn-block" onClick = {validateUser}>Sign In</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userData : state.userData
})
const mapDispatcherToProps = dispatch => {
  return {
    login : () => dispatch(loginUser()),
  }
}
export default connect(mapStateToProps, mapDispatcherToProps)(Login)
