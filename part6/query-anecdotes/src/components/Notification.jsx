import React from 'react'
import { NotificationProvider, useNotification } from './NotificationContext'

import { useReducer } from 'react'
import { errorReducer, setErrorWithTimeout } from '../reducers/errorReducer'

const Notification = ({ children }) => {
  const { notification } = useNotification()

  const [errorState, errorDispatch] = useReducer(errorReducer, { error: null })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <NotificationProvider>
      {notification && notification.message && (
        <div style={style} className="notification-container">
          {notification.message}
        </div>
      )}
      {children}
    </NotificationProvider>
  );
};

export default Notification
