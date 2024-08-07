import express from 'express'
import calculateBmi from "./bmiCalculator"
import calculateExercise, { ExerciseResult } from './exerciseCalculator'


const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
   res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
   const height = Number(req.query.height)
   const weight = Number(req.query.weight)

   if (!height || !weight) {
      return res.status(400).send({ error: 'malformatted parameters' })
   }

   const bmi = calculateBmi(height, weight)

   return res.send({
      height,
      weight,
      bmi
   })
})

app.post('/exercises', (req, res) => {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   const { daily_exercises, target } = req.body

   if (!daily_exercises || !target) {
      return res.status(400).send({ error: 'parameters missing' });
   }

   if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
      return res.status(400).send({ error: 'malformatted parameters' });
   }

   const dailyExerciseHours = daily_exercises.map((hour: Number) => Number(hour));
   if (dailyExerciseHours.some(isNaN)) {
      return res.status(400).send({ error: 'malformatted parameters' });
   }

   const result: ExerciseResult = calculateExercise(dailyExerciseHours, Number(target));
   return res.send(result);
})

const PORT = 3003
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})