export const SET_ERROR = 'SET_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const errorReducer = (state, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload }
    case CLEAR_ERROR:
      return { ...state, error: null }
    default:
      return state
  }
};

export const setErrorWithTimeout = (dispatch, errorMessage, timeout = 5000) => {
  dispatch({ type: SET_ERROR, payload: errorMessage })

  setTimeout(() => {
    dispatch({ type: CLEAR_ERROR })
  }, timeout)
}
