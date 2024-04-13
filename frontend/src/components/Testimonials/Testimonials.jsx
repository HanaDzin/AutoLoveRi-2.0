import React from 'react'
import { useGetReviewsQuery } from '../../slices/reviewsApiSlice'

export const Testimonials = () => {

    const { data: reviews, isLoading, error} = useGetReviewsQuery();


  return (
    <div className='bg-primary dark:bg-black dark:text-white
    py-14 sm:pb-24'>
    <div className='container'>
        <div className='space-y-4 pb-12'>
            <p data-aos="fade-up" className='dark:text-primary text-3xl font-semibold text-center sm:text-4xl'>Komentari zadovoljnih kupaca</p>
            <p data-aos="fade-up" className='text-center sm:px-34'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti a illo voluptates delectus expedita, 
                quidem perferendis impedit molestiae optio vero et vitae.
            </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-black dark:text-white'>
        { isLoading ? (<div>Loading...</div>) :
        error ? (<div>Error...</div>) :
        (    reviews.map((testimonial) => {
                return <div key={testimonial.name}
                className=' hover:scale-105 card text-center group space-y-3 bg-gray-100 dark:bg-dark
                sm:space-y-4 sm:py-12 duration-300 rounded-lg px-4'
                data-aos="fade-up"
                data-aos-delay={testimonial.aosDelay}>
                    <div className='grid place-items-center'>
                        <img src={testimonial.image} alt="" className='h-20' />
                        </div>
                            <div className='text-xl text-primary'>{testimonial.rating}<span className='text-black dark:text-white text-sm'>/5</span></div>
                            <p>{testimonial.comment}</p>
                            <p className='font-bold text-center text-primary'>{testimonial.name}</p>
                        </div>
                }))
        }
                </div>


    </div>

    </div>
  )
}

export default Testimonials
