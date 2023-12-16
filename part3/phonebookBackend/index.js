const express = require('express')
const app = express()
require('dotenv').config()
const currentTime = new Date()
const options = { timeZone: 'Europe/Bucharest', timeStyle: 'long', dateStyle: 'full' }
const formattedTime = currentTime.toLocaleString('en-US', options)
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')


const password = process.argv[2]

morgan.token('req-body', (req, res) => JSON.stringify(req.body))

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(express.static('dist'))
app.use(express.json())



app.get('/api/persons', (req, res) => {
   Person.find({}).then(person => {
      res.json(person)
   })
})
app.get('/api/persons/:id', (req,res, next) => {
   Person.findById(req.params.id).then(person => {
      if(person) {
         res.json(person)
      } else {
         res.status(404).send
      }
   })
   .catch(err => next(err))
})
app.get('/info', async (req, res) => {
   const total = await Person.countDocuments({})
   res.send(`<p>Phonebook has info for ${total} people </p> ${formattedTime}`)
})
app.put('/api/persons/:id', (req,res,next) => {
   const { name, number } = req.body

   const updatedPerson = {
      name: name,
      number: number
   }

   Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
   )
   .then((person) => {
      if(person){
         res.json(person)
      } else {
         res.status(404).send()
      }
   })
   .catch(err => next(err))
})

app.delete('/api/persons/:id', (req,res,next) => {
   Person.findByIdAndDelete(req.params.id)
   .then(result => {
      res.status(204).end()
   })
   .catch(err => next(err))
})

app.post('/api/persons', (req, res,next) => {
   const { name, number } = req.body

   if (!name || !number) {
      return res.status(400).json({ error: 'Name and number are required' })
   }

   const person = new Person({
      name: name,
      number: number,
   })
   person.save().then(savedPerson => {
      res.json(savedPerson)
   })
   .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
   console.error(error.message)

   if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
   } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
   }
   next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})