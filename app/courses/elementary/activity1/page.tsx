import React from 'react'
import Description from './Description'
import Exercice from './Exercice'

const page = () => {
  return (
    <div className='p-10 pt-[200px] bg-white'>
        <Description />
        <Exercice />
    </div>
  )
}

export default page