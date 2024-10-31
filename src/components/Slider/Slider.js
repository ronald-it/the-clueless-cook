'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';
import RecipeCard from '../RecipeCard';
import styles from './Slider.module.scss';
import ArrowRightIcon from '../ArrowRightIcon';

export default function Slider({ carouselRecipes }) {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.slidePrev) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.slideNext) {
      swiperRef.current.slideNext();
    }
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
      {carouselRecipes &&
        carouselRecipes.map((recipe) => {
          return (
            <SwiperSlide key={recipe.uri.split('_')[1]}>
              <RecipeCard
                link={`/recipe/${recipe.uri.split('_')[1]}`}
                image={recipe.image}
                name={recipe.label}
                calories={recipe.calories}
                ingredients={recipe.ingredients.length}
                time={recipe.totalTime}
              />
            </SwiperSlide>
          );
        })}
      <div className='h-10'>
        <div className='swiper-pagination'></div>
      </div>
      <button
        onClick={handlePrev}
        className='absolute left-8 z-20 p-2 bg-white rounded-full shadow-3xl rotate-180'
        style={{ top: 'calc(50% - 2.5rem)' }}
      >
        <ArrowRightIcon />
      </button>
      <button
        onClick={handleNext}
        className='absolute right-8 z-20 p-2 bg-lightblue rounded-full shadow-3xl'
        style={{ top: 'calc(50% - 2.5rem)' }}
      >
        <ArrowRightIcon />
      </button>
    </Swiper>
  );
}
