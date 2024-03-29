const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
   const { username, name, password } = req.body

   if(password.length < 3) {
      return res.status(400).json({ error: "Password must be at least 3 characters long" })
   }

   const saltRounds = 10
   const hashPassword = await bcrypt.hash(password, saltRounds)

   const user = new User ({
      username,
      name,
      hashPassword
})

const savedUser = await user.save()

res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) => {
   const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, likes: 1 })
   res.json(users)
})

module.exports = userRouter