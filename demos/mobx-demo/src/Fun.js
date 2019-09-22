import React from 'react'
import { observer, inject } from "mobx-react"

const Fun = inject('birdStore')(
  observer ((props) => {
    console.log('fun', props)
    return (
      <div>
        {props.birdStore.birdCount}
    </div>
    )
  })
)

export default Fun

