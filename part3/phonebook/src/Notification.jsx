import React from 'react'

const Notification = ({message}) => {

   if(message === null) {
      return null
   }

   return (
      <div>
         <div className='success-message'>
            {message}
         </div>
      </div>
   )
}

export default Notification
