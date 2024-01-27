import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { NotificationProvider } from './components/NotificationContext'

const App = () => {

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationProvider>
        <AnecdoteForm />
      </NotificationProvider>
        
    </div>
  )
}

export default App
