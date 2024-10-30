'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';
import RecipeCard from '../RecipeCard';
import styles from './Slider.module.scss';

export default function Slider() {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };
  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1.2}
      centeredSlides={true}
      initialSlide={1}
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
        bulletActiveClass: styles.bulletActive,
      }}
      loop={true}
    >
      <SwiperSlide>
        <RecipeCard recipeTitle='1' />
      </SwiperSlide>
      <SwiperSlide>
        <RecipeCard recipeTitle='2' />
      </SwiperSlide>
      <SwiperSlide>
        <RecipeCard recipeTitle='3' />
      </SwiperSlide>
      <div className='h-10'>
        <div
          className='swiper-pagination'
        ></div>
      </div>
    </Swiper>
  );
}
