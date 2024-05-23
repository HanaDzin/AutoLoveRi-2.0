import React from 'react'

const FormContainer = ({ children }) => {
  return (
    <div className='min-h-screen pb-10 dark:bg-black dark:text-white duration-300 bg-primary/70
    sm:grid sm:place-items-center'>
        <div className='container'>
            <div className='place-items-center text-3xl text-center'>
            { children }
            </div>
        </div>
    </div>
  )
}

export default FormContainer