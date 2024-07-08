interface ErrorNotofocationProps {
   message: string | null;
}


const ErrorNotofocation = ({ message }: ErrorNotofocationProps) => {

   if(message === null) {
      return null
   }

  return (
    <div>
      {message && <h1 style={{color: 'red'}}>{message}</h1>}
    </div>
  )
}

export default ErrorNotofocation
