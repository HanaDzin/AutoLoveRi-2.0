import React from 'react'

const ReviewCard = (props) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 text-black dark:text-white'>
        <div className='card text-center group space-y-3 bg-gray-100 dark:bg-white/20
            sm:space-y-4 sm:py-12 duration-300 rounded-lg'>

                <div className='grid place-items-center'>
                    <img src={props.img} alt="" className='h-20' />
                </div>

                <div className='text-2xl'>⭐⭐⭐⭐⭐</div>
                    <p>{props.text}</p>
                    <p className='font-bold text-center text-primary'>{props.name}</p>
        </div>
    </div>
  )
}

export default ReviewCard