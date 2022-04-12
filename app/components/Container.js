import React, { useEffect } from "react"

function Container(props) {
  return (
    // Here is where props can be used to specify the container on a deepr level. 
    // This is using a conditional 
    <div className={"container py-md-5 " + (props.wide ? '' : 'container--narrow')}>
      {props.children}
    </div>
  )
}

export default Container