import React from 'react'
import Description from './Description'
import Exercice from './Exercice'
import Description2 from './Description2'
import Exercice2 from './Exercice2'


const page = () => {
  return (
    <div className='p-10 pt-[200px] bg-white'>
     <Description />
     <Exercice />
     <Description2 />
     <Exercice2 />
    </div>
  )
}

export default page