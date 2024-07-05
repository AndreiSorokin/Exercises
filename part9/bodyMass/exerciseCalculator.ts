export interface ExerciseResult {
   periodLength: number;
   trainingDays: number;
   average: number;
   success: boolean;
   rating: number;
   ratingDescription: string;
   target: number;
}

export default function calculateExercises(dailyExcerciseHours: number[], target: number) {
   const periodLength = dailyExcerciseHours.length
   const trainingDays = dailyExcerciseHours.filter(hours => hours > 0).length
   const totalHours = dailyExcerciseHours.reduce((sum, hours) => sum + hours, 0)
   const average = totalHours / periodLength
   const success = average >= target

   let rating: number
   let ratingDescription: string

   if(average >= target) {
      rating = 3
      ratingDescription = 'Great job!'
   } else if(average >= target * 0.8) {
      rating = 2
      ratingDescription = 'Very good!'
   } else {
      rating = 1
      ratingDescription = 'Good!'
   }

   return {
      periodLength,
      trainingDays,
      average,
      success,
      rating,
      ratingDescription,
      target
   }
}