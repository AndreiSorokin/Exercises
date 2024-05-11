import React from 'react'
import ReactDOM from 'react-dom/client'
import {
   BrowserRouter as Router,
   BrowserRouter
} from 'react-router-dom'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
   uri: 'http://localhost:4000/',
   cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <ApolloProvider client={client}>
         <App />
      </ApolloProvider>
   </BrowserRouter>
)