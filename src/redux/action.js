// Create Redux action creators that return an action
export const loginUser = () => ({
  type : 'LOG_IN',
})

export const initializeAirportDetails = (data) => ({
  type : 'SET_AIRPORT_DATA',
  data ,
})
export const mergeTransation = (data) => ({
  type : 'ADD_TRANSACTION',
  data ,
})
export const updateTransation = (data) => ({
  type : 'UPDATE_TRANSACTION',
  data ,
})

export const updateData = (data) => ({
  type : 'UPDATE_DATA',
  data ,
})


// export const getPostsSuccess = posts => ({
//   type: GET_POSTS_SUCCESS,
//   payload: posts,
// })
//
// export const getPostsFailure = () => ({
//   type: GET_POSTS_FAILURE,
// })
