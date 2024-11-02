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
  const [formState, setFormState] = useState({
    recipe: '',
    meal: '',
    cuisine: '',
    diet: '',
    time: '',
  });
  const [carouselRecipeCards, setCarouselRecipeCards] = useState();
  const [recipes, setRecipes] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const fetchSearchResults = async (searchParams) => {
    const { recipe, meal, cuisine, diet, time } = searchParams;
    try {
      const requiredApiParams = {
        type: 'public',
        app_id: API_ID,
        app_key: API_KEY,
      };

      const response = await axios.get(`${URI}${endpoint}`, {
        params: {
          ...requiredApiParams,
          q: recipe,
          mealType: meal ? meal : null,
          cuisineType: cuisine ? cuisine : null,
          diet: diet ? diet : null,
          time: time ? time : null,
        },
      });

      const recipesData = response.data.hits.map((hit) => hit.recipe);
      setRecipes(recipesData);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => console.log(recipes), [recipes]);

  useEffect(() => console.log(formState), [formState]);

  return (
    <>
      <Header toggleModal={toggleModal} />

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        className='h-full flex justify-center items-center p-6'
        style={{ overlay: { zIndex: 9999 } }}
      >
        <div className='relative h-full max-h-[30rem] w-full max-w-md flex justify-center items-center bg-darkblue rounded-xl [&>*]:text-white [&>*]:text-xl [&>*]:font-light'>
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
            priority={true}
          />
          <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 [&>*]:text-white [&>*:last-child]:text-darkblue [&>*]:text-nowrap w-full max-w-2xl px-8'>
            <h2>Delicious Recipes.</h2>
            <h2 className='font-light'>Daily Updated</h2>
            <a
              href='#recipe-search'
              className='mt-2 bg-lightblue pl-2 pr-4 py-1 rounded-md text-xs font-semibold flex items-center w-fit'
            >
              <span className='mr-1 py-1.5'>Find Recipes</span>
              <span>
                <ArrowRightIcon />
              </span>
            </a>
          </div>
        </section>

        <section className='-mt-16 relative'>
          <Slider carouselRecipes={carouselRecipeCards} />
          <div className='hidden lg:flex lg:w-full lg:max-w-7xl border-2 border-black'>
            {carouselRecipeCards &&
              carouselRecipeCards.map((recipe) => {
                return (
                  <RecipeCard
                    key={recipe.uri.split('_')[1]}
                    link={`/recipe/${recipe.uri.split('_')[1]}`}
                    image={recipe.image}
                    name={recipe.label}
                    calories={recipe.calories}
                    ingredients={recipe.ingredients.length}
                    time={recipe.totalTime}
                  />
                );
              })}
          </div>
        </section>

        <section id='recipe-search' className='bg-darkblue flex justify-center'>
          <form
            className='p-8 grid grid-areas-[recipe_recipe,meal_cuisine,diet_time,search_search] grid-cols-2 grid-rows-4 gap-y-5 gap-x-1 [&>*:last-child]:font-semibold w-full max-w-2xl'
            onSubmit={(e) => {
              e.preventDefault();
              console.log('pre fired');
              fetchSearchResults(formState);
              console.log('post fired');
            }}
          >
            <label className='grid-in-[recipe] relative' htmlFor='recipe'>
              <input
                name='recipe'
                id='recipe'
                className='w-full px-2.5 py-3.5 rounded font-light text-sm'
                type='search'
                placeholder='Recipe search'
                onChange={handleChange}
              />
              <button type='submit' className='h-4 w-4 absolute top-1/2 -translate-y-1/2 right-6'>
                <CustomImage src='images/search.png' alt='Search icon' width={100} height={100} />
              </button>
            </label>
            <label className='grid-in-[meal]' htmlFor='meal'>
              <select
                name='meal'
                id='meal'
                className='w-full px-2.5 py-3.5 rounded font-light text-sm'
                onChange={handleChange}
              >
                <option value=''>Meal type</option>
                <option value='breakfast'>Breakfast</option>
                <option value='brunch'>Brunch</option>
                <option value='lunch'>Lunch</option>
                <option value='dinner'>Dinner</option>
                <option value='snack'>Snack</option>
                <option value='teatime'>Tea time</option>
              </select>
            </label>
            <label className='grid-in-[cuisine]' htmlFor='cuisine'>
              <select
                name='cuisine'
                id='cuisine'
                className='w-full px-2.5 py-3.5 rounded font-light text-sm'
                onChange={handleChange}
              >
                <option value=''>Cuisine</option>
                <option value='american'>American</option>
                <option value='asian'>Asian</option>
                <option value='british'>British</option>
                <option value='caribbean'>Caribbean</option>
                <option value='central europe'>Central Europe</option>
                <option value='chinese'>Chinese</option>
                <option value='eastern europe'>Eastern Europe</option>
                <option value='french'>French</option>
                <option value='greek'>Greek</option>
                <option value='indian'>Indian</option>
                <option value='italian'>Italian</option>
                <option value='japanese'>Japanese</option>
                <option value='korean'>Korean</option>
                <option value='kosher'>Kosher</option>
                <option value='mediterranean'>Mediterranean</option>
                <option value='mexican'>Mexican</option>
                <option value='middle eastern'>Middle Eastern</option>
                <option value='nordic'>Nordic</option>
                <option value='south american'>South American</option>
                <option value='south east asian'>South East Asian</option>
                <option value='world'>World</option>
              </select>
            </label>
            <label className='grid-in-[diet]' htmlFor='diet'>
              <select
                name='diet'
                id='diet'
                className='w-full px-2.5 py-3.5 rounded font-light text-sm'
                onChange={handleChange}
              >
                <option value=''>Diet</option>
                <option value='balanced'>Balanced</option>
                <option value='high-fiber'>High-Fiber</option>
                <option value='high-protein'>High-Protein</option>
                <option value='low-carb'>Low-Carb</option>
                <option value='low-fat'>Low-Fat</option>
                <option value='low-sodium'>Low-Sodium</option>
              </select>
            </label>
            <label className='grid-in-[time]' htmlFor='time'>
              <select
                name='time'
                id='time'
                className='w-full px-2.5 py-3.5 rounded font-light text-sm'
                onChange={handleChange}
              >
                <option value=''>Time</option>
                <option value='0-15'>0-15 min.</option>
                <option value='16-30'>16-30 min.</option>
                <option value='31-60'>31-60 min.</option>
                <option value='61%2B'>More than 60 min.</option>
              </select>
            </label>
            <button
              className='grid-in-[search] bg-lightblue text-darkblue rounded flex justify-center items-center'
              type='submit'
            >
              <span className='mr-2'>Search</span>
              <span>
                <ArrowRightIcon />
              </span>
            </button>
          </form>
        </section>

        <section className='flex justify-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-8 max-w-2xl p-8'>
            {recipes &&
              recipes.map((recipe) => {
                return (
                  <RecipeCard
                    key={recipe.uri.split('_')[1]}
                    link={`/recipe/${recipe.uri.split('_')[1]}`}
                    image={recipe.image}
                    name={recipe.label}
                    calories={recipe.calories}
                    ingredients={recipe.ingredients.length}
                    time={recipe.totalTime}
                  />
                );
              })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
