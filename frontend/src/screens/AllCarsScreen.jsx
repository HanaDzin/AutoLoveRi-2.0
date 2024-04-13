import React from 'react'
import { Link } from 'react-router-dom'


import NewCarsScreen from './NewCarsScreen'
import UsedCarsScreen from './UsedCarsScreen'

const AllCarsScreen = () => {
  return (
    <div className='pb-8 pt-14 bg-white dark:bg-dark dark:text-white'>
        
        <NewCarsScreen />
        
        <UsedCarsScreen />
        
    </div>

  )
}

export default AllCarsScreen