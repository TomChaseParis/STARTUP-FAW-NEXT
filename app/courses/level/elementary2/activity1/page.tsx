import React from 'react'
import Description from './Description'
import Exercice from './Exercice'
import Exercice2 from './Exercice2'
import ChatViviane from '@/app/components/ChatViviane'


const page = () => {
  return (
    <div className='p-10 pt-[200px] bg-white'>
     <Description />
     <Exercice />
     <Exercice2 />
     <ChatViviane activityId="elementary_activity_1" />
    </div>
  )
}

export default page