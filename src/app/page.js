'use client';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import CloseIcon from '../components/CloseIcon';
import CustomImage from '../components/CustomImage/CustomImage';
import ArrowRightIcon from '../components/ArrowRightIcon';
import Slider from '../components/Slider/Slider';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';

export default function Home() {
  // Declare variables for URI, endpoint, API ID and API Key
  const URI = 'https://api.edamam.com';
  const endpoint = '/api/recipes/v2';
  const API_ID = '44920bbe';
  const API_KEY = 'e0b07558906ed952fb1226ace4bc0227';

  // Initialize useState
  const [carouselRecipeCards, setCarouselRecipeCards] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recipeCards = Array.from({ length: 20 }, (_, i) => i);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    async function fetchCarouselRecipeCards() {
      const recipeKeywords = [
        'Pizza',
        'Spaghetti',
        'Burger',
        'Hot Dog',
        'Tacos',
        'Enchiladas',
        'Couscous',
        'Shakshuka',
        'Kebab',
        'Ćevapi',
        'Sarma',
        'Biryani',
        'Butter Chicken',
        'Dumplings',
        'Sweet and Sour Pork',
        'Sushi',
        'Ramen',
        'Pho',
        'Pad Thai',
      ];

      // Function to get random keywords that will be used for API requests related to the recipe cards carousel
      const getRandomKeywords = (keywordsArray) => {
        const randomKeywords = new Set();

        while (randomKeywords.size < 3) {
          const randomIndex = Math.floor(Math.random() * keywordsArray.length);
          const randomKeyword = keywordsArray[randomIndex];

          randomKeywords.add(randomKeyword);
        }

        return Array.from(randomKeywords);
      };

      const [keywordOne, keywordTwo, keywordThree] = getRandomKeywords(recipeKeywords);

      const requiredApiParams = {
        type: 'public',
        app_id: API_ID,
        app_key: API_KEY,
      };

      try {
        const [responseOne, responseTwo, responseThree] = await Promise.all([
          axios.get(`${URI}${endpoint}`, { params: { ...requiredApiParams, q: keywordOne } }),
          axios.get(`${URI}${endpoint}`, { params: { ...requiredApiParams, q: keywordTwo } }),
          axios.get(`${URI}${endpoint}`, { params: { ...requiredApiParams, q: keywordThree } }),
        ]);

        const getRandomRecipe = (hits) => {
          const randomIndex = Math.floor(Math.random() * hits.length);
          return hits[randomIndex].recipe;
        };

        setCarouselRecipeCards([
          getRandomRecipe(responseOne.data.hits),
          getRandomRecipe(responseTwo.data.hits),
          getRandomRecipe(responseThree.data.hits),
        ]);
      } catch (error) {
        console.log(error);
      }
    }

    if (!carouselRecipeCards) {
      fetchCarouselRecipeCards();
    }
  }, [carouselRecipeCards]);

  useEffect(() => console.log(carouselRecipeCards), [carouselRecipeCards]);

  return (
    <>
      <Header toggleModal={toggleModal} />
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        className='h-full p-4'
        style={{ overlay: { zIndex: 9999 } }}
      >
        <div className='h-full w-full flex justify-center items-center bg-darkblue rounded-xl [&>*]:text-white [&>*]:text-xl [&>*]:font-light'>
          <button className='absolute top-8 right-8 w-6' onClick={toggleModal}>
            <CloseIcon />
          </button>
          <div className='flex flex-col w-3/4 justify-between items-center [&>*]:w-full [&>*]:flex [&>*]:justify-center [&>*]:mb-4 [&>*]:pb-4 [&>*]:border-b-2 [&>*]:border-white [&>*:last-child]:border-none [&>*:last-child]:m-0 [&>*:last-child]:p-0'>
            <button onClick={toggleModal}>
              <Link href='/'>Home</Link>
            </button>
            <button onClick={toggleModal}>
              <a href='#footer'>About</a>
            </button>
            <span>
              <Link href='/calculator'>Calculator</Link>
            </span>
            <span>
              <Link href='/login'>Login</Link>
            </span>
            <div>
              <span className='w-full flex justify-center bg-lightblue text-darkblue font-semibold rounded-md py-1'>
                <Link href='/register'>Register</Link>
              </span>
            </div>
          </div>
        </div>
      </ReactModal>
      <main>
        <section className='relative'>
          <CustomImage
            src='images/hero-image.jpg'
            alt='Hero image'
            className='w-full h-96 object-cover'
            width={100}
            height={100}
          />
          <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 [&>*]:text-white [&>*:last-child]:text-darkblue [&>*]:text-nowrap'>
            <h2>Delicious Recipes.</h2>
            <h2 className='font-light'>Daily Updated</h2>
            <button className='mt-2 bg-lightblue pl-2 pr-4 py-1 rounded-md text-xs font-semibold flex items-center'>
              <span className='mr-1 py-1.5'>Find Recipes</span>
              <span>
                <ArrowRightIcon />
              </span>
            </button>
          </div>
        </section>
        <section className='-mt-16 relative'>
          <Slider />
        </section>
        <section className='p-8 bg-darkblue grid grid-areas-[recipe_recipe,meal_cuisine,diet_time,search_search] grid-cols-2 grid-rows-4 gap-y-5 gap-x-1 [&>*]:px-2.5 [&>*]:py-3.5 [&>*]:rounded [&>*]:font-light [&>*]:text-sm [&>*:last-child]:font-semibold'>
          <input type='search' placeholder='Recipe search' className='grid-in-[recipe]' />
          <select className='grid-in-[meal]'>
            <option>Meal</option>
          </select>
          <select className='grid-in-[cuisine]'>
            <option>Cuisine</option>
          </select>
          <select className='grid-in-[diet]'>
            <option>Diet</option>
          </select>
          <select className='grid-in-[time]'>
            <option>Time</option>
          </select>
          <button className='grid-in-[search] bg-lightblue text-darkblue'>Search</button>
        </section>
        <section className='p-6 grid grid-cols-1 gap-y-6'>
          {recipeCards.map((recipeCard) => {
            return <RecipeCard key={recipeCard} />;
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
