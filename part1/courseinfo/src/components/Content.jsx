import React from 'react'
import Total from './Total'
import Partprops from './Partprops'
import Partreact from './Partreact'
import Partstate from './Partstate'
import Partredux from './Partredux'
import Partrouting from './Partrouting'
import Partmiddlewares from './Partmiddlewares'
import Total2 from './total2'

const Content = ({course}) => {
  return (
    <div>
      <Partreact course={course} />
      <Partprops course={course} />
      <Partstate course={course} />
      <Partredux course={course} />
      <Total course={course} />
      <Partrouting course={course} />
      <Partmiddlewares course={course} />
      <Total2 course={course} />
    </div>
  )
}

export default Content
