import React from 'react'

const Header = (props) => {

  return (
    <div>
      <h1>Web development curriculum</h1>
      <h2>{props.course[0].name}</h2>
    </div>
  )
}

export default Header
