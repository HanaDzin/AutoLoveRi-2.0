import React from 'react'

import image from '../assets/grid1.jpeg'

const ArticleScreen = () => {
  return (
<div className='px-20 dark:bg-black dark:text-white duration-300 
  bg-primary
  sm:min-h-[600px] sm:grid sm:place-items-center'>
  <div className="container">
    <div className="place-items-center">

      <div>
        <div className='space-y-15 mt-10 sm:p-10 pb-6'>
          <h1 className='text-3xl sm:text-4xl font-bold font-serif dark:text-primary pb-2'
          data-aos="fade-up">Ime članka</h1>
          <div className='grid p-10 lg:grid-cols-2 sm:grid-cols-1'>
          <div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio qui debitis, iusto, ducimus nulla eligendi veritatis consectetur, 
            esse impedit consequuntur velit mollitia maiores? Odit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quia in tempore, 
            obcaecati excepturi temporibus!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio qui debitis, iusto, ducimus nulla eligendi veritatis consectetur, 
            esse impedit consequuntur velit mollitia maiores? Odit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quia in tempore, 
            obcaecati excepturi temporibus!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio qui debitis, iusto, ducimus nulla eligendi veritatis consectetur, 
            esse impedit consequuntur velit mollitia maiores? Odit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quia in tempore, 
            obcaecati excepturi temporibus!</p>
          </div>
          <div className='p-2 m-2 rounded-lg' data-aos="fade-left">
            <img src={image} alt="" />
          </div>
          </div>
          <div className='grid lg:grid-cols-2 sm:grid-cols-1'>
          <div className='p-2 m-2 rounded-lg' data-aos="fade-right">
            <img src={image} alt="" />
          </div>
          <div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio qui debitis, iusto, ducimus nulla eligendi veritatis consectetur, 
            esse impedit consequuntur velit mollitia maiores? Odit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quia in tempore, 
            obcaecati excepturi temporibus!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio qui debitis, iusto, ducimus nulla eligendi veritatis consectetur, 
            esse impedit consequuntur velit mollitia maiores? Odit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quia in tempore, 
            obcaecati excepturi temporibus!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio qui debitis, iusto, ducimus nulla eligendi veritatis consectetur, 
            esse impedit consequuntur velit mollitia maiores? Odit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quia in tempore, 
            obcaecati excepturi temporibus!</p>
          </div>

          

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    
  )
}

export default ArticleScreen