const mongoose = require('mongoose')

const password = process.argv[2]
const url = process.env.MONGODB_URI

const personSchema = new mongoose.Schema({
   name: String,
   number: String,
})
const Person = mongoose.model('Person', personSchema)

mongoose.set('strictQuery',false)
mongoose.connect(url)

if(process.argv.length > 3) {
   const personName = process.argv[3]
   const personNumber = process.argv[4]

   const person = new Person({
      name: personName,
      number: personNumber,
   })

   person.save().then(result => {
      if(personName && personNumber){
         console.log(`Added ${personName} number ${personNumber} to phonebook`)
         mongoose.connection.close()
      }
   })
} else {
   Person.find({}).then(result => {
      result.forEach(p => {
         console.log(`${p.name} ${p.number}`)
      })
      mongoose.connection.close()
   }).catch(err => {
      console.error(err)
      mongoose.connection.close()
   })
}
