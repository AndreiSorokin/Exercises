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

const args = process.argv.slice(2)

if(args.length !== 2) {
   console.error('Please provide height and weight')
   process.exit(1)
}

const height = parseFloat(args[0]);
const weight = parseFloat(args[1]);

if (isNaN(height) || isNaN(weight)) {
   console.error('Height and weight should be numbers.');
   process.exit(1);
}

console.log(calculateBmi(height, weight))