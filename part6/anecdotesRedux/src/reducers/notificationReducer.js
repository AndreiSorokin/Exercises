import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
   name: 'notification',
   initialState,
   reducers: {
      setNotification(state, action) {
         return action.payload
      },
      clearNotification(state) {
         return null
      }
   }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const displayNotification = (message, timeout) => {
   return (dispatch) => {
      const timeoutId = setTimeout(() => {
         dispatch(clearNotification())
     }, timeout * 1000)

      dispatch(setNotification({ message, timeoutId }))
   }
}

export default notificationSlice.reducer