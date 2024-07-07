import React from 'react'

interface TotalExercisesProps {
  totalExercises: number
}

const Total = (props: TotalExercisesProps): JSX.Element => {
  return (
    <div>
      <p>
        Number of exercises {props.totalExercises}
      </p>
    </div>
  )
}

export default Total
