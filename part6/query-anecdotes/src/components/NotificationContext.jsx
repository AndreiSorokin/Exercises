import React, { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const NotificationProvider = ({ children }) => {
  const initialState = {
    message: null,
  };

  const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return { message: action.payload }
      case 'CLEAR_NOTIFICATION':
        return { message: null }
      default:
        return state
    }
  };

  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const setNotification = (message, duration = 5000) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message })

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, duration)
  }

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }

  return (
    <NotificationContext.Provider value={{ notification: state, setNotification, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
};

export { NotificationProvider, useNotification }
