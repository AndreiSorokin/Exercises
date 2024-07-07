import React from 'react'

interface CoursePart {
  name: string
  exerciseCount: number
}

interface CoursePartsProps {
  courseParts: Array<CoursePart>
}

const Content = (props: CoursePartsProps): JSX.Element => {
  return (
    <div>
      <p>
        {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
      </p>
      <p>
        {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
      </p>
      <p>
        {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
      </p>
    </div>
  )
}

export default Content
