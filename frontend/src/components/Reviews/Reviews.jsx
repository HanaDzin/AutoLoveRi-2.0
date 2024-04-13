import React, { Component } from "react";
import Slider from "react-slick";

import icon1 from '../../assets/icon1.png'
import icon2 from '../../assets/icon2.png'
import icon3 from '../../assets/icon3.png'

import ReviewCard from './ReviewCard'

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 2500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
        <div className='dark:bg-black dark:text-white
        py-14 sm:pb-24'>
        <div className='container'>
            <div className='space-y-4 pb-12'>
                <p data-aos="fade-up" className='text-3xl font-semibold text-center sm:text-4xl'>Komentari zadovoljnih kupaca</p>
                <p data-aos="fade-up" className='text-center sm:px-34'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti a illo voluptates delectus expedita, 
                    quidem perferendis impedit molestiae optio vero et vitae.
                </p>
            </div>

        <Slider {...settings}>
            <div>
            <ReviewCard img={icon1} text="Udobna i sigurna vožnja u savršenom vozilu." name="Marko"/>
            </div>
            <div>
            <ReviewCard img={icon2} text="Udobna i sigurna vožnja u savršenom vozilu." name="Marko"/>
            </div>
            <div>
            <ReviewCard img={icon3} text="Udobna i sigurna vožnja u savršenom vozilu." name="Marko"/>
            </div>
            <div>
            <ReviewCard img={icon1} text="Udobna i sigurna vožnja u savršenom vozilu." name="Marko"/>
            </div>
            
        </Slider>
        </div>
      </div>
    );
  }
}