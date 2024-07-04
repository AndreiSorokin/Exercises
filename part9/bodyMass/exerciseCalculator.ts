interface ExerciseResult {
   periodLength: number;
   trainingDays: number;
   target: number;
   average: number;
   success: boolean;
   rating: number;
   ratingDescription: string;
}

function calculateExercises(dailyExcerciseHours: number[], target: number) {
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
      target,
      average,
      success,
      rating,
      ratingDescription
   }
}

const argms = process.argv.slice(2)

if (argms.length < 2) {
   console.error('Please provide the target and daily exercise hours as arguments.');
   process.exit(1);
}


const target = parseFloat(argms[0]);
const dailyExcerciseHours = argms.slice(1).map(arg => parseFloat(arg));

if (isNaN(target) || dailyExcerciseHours.some(isNaN)) {
   console.error('Invalid input. Target and all exercise hours should be numbers.');
   process.exit(1);
}

console.log(calculateExercises(dailyExcerciseHours, target));
