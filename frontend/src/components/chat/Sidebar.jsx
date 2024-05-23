import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'

const Sidebar = () => {
  return (
    <div className='border-r border-primary p-4 m-4 flex flex-col'>
        <SearchInput />
        <Conversations />
    </div>
  )
}

export default Sidebar