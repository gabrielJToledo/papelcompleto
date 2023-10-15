import React from 'react';
import './Home.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import FeaturedProducts from './FeaturedProducts';
import Environments from './Environments';

const banner1 = require('../../assets/images/carousel/banner-01.jpg')
const banner2 = require('../../assets/images/carousel/banner-02.jpg')
const banner3 = require('../../assets/images/carousel/banner-03.jpg')

function Home() {

  const bannerHomeSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <main className="home">
      <div className="carousel-container d-flex justify-content-center align-items- my-5">
        <Slider {...bannerHomeSettings}>
          <div>
            <img className='img_banner' src={banner1} alt="" />
          </div>
          <div>
            <img className='img_banner' src={banner2} alt="" />
          </div>
          <div>
            <img className='img_banner' src={banner3} alt="" />
          </div>
        </Slider>
      </div>

      <div className="wrapper d-flex justify-content-center align-items-center my-5">
        <FeaturedProducts />
      </div>

      <div className="wrapper d-flex justify-content-center aling-items-center my-5">
        <Environments />
      </div>
    </main>
  );
}

export default Home;
