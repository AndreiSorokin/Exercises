function calculateBmi (height: number, weight: number) {
   const calc: number = weight / ( ( height / 100 ) ** 2 )
   if(calc < 18.5) {
      const verdict: string = 'underweight'
      return verdict
   } else if ( calc > 18.5 && calc <= 24.9 ) {
      const verdict: string = 'normal weight'
      return verdict
   } else if ( calc > 24.9 && calc <= 29.9 ) {
      const verdict: string = 'overweight'
      return verdict
   }
   const verdict: string = 'obese'
   return verdict 
}
console.log(calculateBmi(180, 74))