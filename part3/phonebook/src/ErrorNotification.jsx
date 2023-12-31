import React from 'react'

const ErrorNotification = ({message}) => {

   if(message === null) {
      return null
   }
   return (
   <div className='error-message' >
      {message}
   </div>
   )
}

export default ErrorNotification
