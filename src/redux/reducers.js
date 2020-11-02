const initialState = {
  validUser : false,
  userData : {
    userName : 'admin',
    userPassword : 'admin',
  },
  airportData : [],
  transaction : [],

}

function airportReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOG_IN' :
      return {
        ...state,
        validUser : true,
      }
    case 'SET_AIRPORT_DATA' :
      return {
        ...state,
        airportData : action.data,
      }
    case 'ADD_TRANSACTION' :
      return {
        ...state,
        [state.transaction] : state.transaction.push(action.data),
      }
      case 'UPDATE_TRANSACTION' :
        return {
          ...state,
          [state.transaction] : action.data,
        }
      case 'UPDATE_DATA' :
        return {
          ...state,
          airportData : action.data
        }
    default:
      return state
  }
  // return state
}

export default airportReducer
