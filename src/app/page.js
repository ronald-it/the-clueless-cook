'use client';
import { useContext, useEffect, useState } from 'react';
import CustomImage from '../components/CustomImage/CustomImage';
import ArrowRightIcon from '../components/ArrowRightIcon';
import Slider from '../components/Slider/Slider';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { smoothScrollToSection } from '../utils/smoothScrollToSection';

// Declare variables for URI, endpoint, API ID and API Key
const URI = 'https://api.edamam.com';
const endpoint = '/api/recipes/v2';
const API_ID = '44920bbe';
const API_KEY = 'e0b07558906ed952fb1226ace4bc0227';

export default function Home() {
  // Declare useContext variable
  const { authorization } = useContext(AuthContext);

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
  const [carouselError, toggleCarouselError] = useState(false);
  const [searchError, toggleSearchError] = useState(false);
  const [noRecipesFound, toggleNoRecipesFound] = useState(false);
  const [loadingCarouselRecipes, toggleLoadingCarouselRecipes] = useState(true);
  const [loading, toggleLoading] = useState(false);

  // Handle changes in recipe search input and select elements
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submission of recipe search form
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSearchResults(formState);
  };

  // Function to set the recipes based on the search section input
  const fetchSearchResults = async (searchParams) => {
    toggleLoading(true);
    toggleNoRecipesFound(false);
    toggleSearchError(false);

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
      setRecipes(recipesData.slice(0, recipesData.length - 2));
      if (response.data.hits.length === 0) {
        toggleNoRecipesFound(true);
      }
    } catch (error) {
      toggleSearchError(true);
    }
    toggleLoading(false);
  };

  // useEffect to fill the carousel recipe cards at initial page render
  useEffect(() => {
    const fetchCarouselRecipeCards = async () => {
      toggleLoadingCarouselRecipes(true);
      toggleCarouselError(false);
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
        toggleCarouselError(true);
      }
      toggleLoadingCarouselRecipes(false);
    };

    if (!carouselRecipeCards) {
      fetchCarouselRecipeCards();
    }
  }, [carouselRecipeCards]);

  return (
    <>
      {!loadingCarouselRecipes ? (
        <>
          <section className='relative'>
            <CustomImage
              src='images/hero-image.jpg'
              alt='Hero image'
              className='w-full h-96 object-cover'
              width={100}
              height={100}
              priority={true}
            />
            <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 [&>*]:text-white [&>*:last-child]:text-darkblue [&>*]:text-nowrap w-full max-w-2xl lg:max-w-7xl px-8'>
              <h2 className='lg:text-5xl'>Delicious Recipes.</h2>
              <h2 className='font-light lg:text-4xl'>Daily Updated.</h2>
              <button
                className='mt-2 lg:mt-4 bg-lightblue pl-2 pr-4 py-1 rounded-md text-xs font-semibold flex items-center w-fit'
                onClick={() => smoothScrollToSection('recipe-search')}
              >
                <span className='mr-1 py-1.5'>Find Recipes</span>
                <span>
                  <ArrowRightIcon />
                </span>
              </button>
            </div>
          </section>

          {!carouselError ? (
            <section className='-mt-16 relative lg:flex lg:justify-center lg:items-center'>
              <Slider carouselRecipes={carouselRecipeCards} />
              <div className='hidden lg:flex lg:justify-center lg:items-center lg:w-full lg:max-w-7xl lg:mb-8 lg:px-8'>
                {carouselRecipeCards &&
                  carouselRecipeCards.map((recipe, index) => {
                    return (
                      <RecipeCard
                        key={recipe.uri.split('_')[1]}
                        link={`/recipe?id=${recipe.uri.split('_')[1]}`}
                        image={recipe.image}
                        name={recipe.label}
                        calories={recipe.calories}
                        ingredients={recipe.ingredients.length}
                        time={recipe.totalTime}
                        gradientRight={index == 0}
                        gradientLeft={index == 2}
                        index={index}
                      />
                    );
                  })}
              </div>
            </section>
          ) : (
            <div className='flex justify-center'>
              <span className='flex justify-center px-8 my-8 text-red-500 font-bold w-full max-w-2xl'>
                API Request limit has been reached, please try again later.
              </span>
            </div>
          )}

          <section id='recipe-search' className='bg-darkblue flex justify-center relative'>
            {(!authorization || carouselError) && (
              <div className='absolute top-1/2 -translate-y-1/2 z-[9998] w-full h-full text-lg sm:text-xl text-darkblue font-bold bg-white/60 flex justify-center items-center shadow-3xl'>
                {!authorization && (
                  <span className='p-8'>Please log in to access the recipe search.</span>
                )}
              </div>
            )}
            <form
              className='p-8 grid grid-areas-[recipe_recipe,meal_cuisine,diet_time,search_search] grid-cols-2 grid-rows-4 gap-y-5 gap-x-1 [&>*:last-child]:font-semibold lg:[&>*:first-child]:w-[100rem] xl:[&>*:first-child]:w-[150rem] w-full max-w-2xl lg:max-w-7xl lg:gap-y-0 lg:gap-x-6 lg:flex lg:[&>*]:w-full'
              onSubmit={handleSubmit}
            >
              <label className='grid-in-[recipe] relative' htmlFor='recipe'>
                <input
                  name='recipe'
                  id='recipe'
                  className='w-full pl-2.5 pr-12 lg:pr-6 py-3.5 rounded font-light text-sm lg:h-full disabled:bg-white disabled:opacity-50'
                  type='search'
                  placeholder='Recipe search'
                  onChange={handleChange}
                  disabled={!authorization || carouselError}
                />
                <button
                  type='submit'
                  className='h-4 w-4 absolute top-1/2 -translate-y-1/2 right-6 lg:right-2'
                  disabled={!authorization || carouselError}
                >
                  <CustomImage src='images/search.png' alt='Search icon' width={100} height={100} />
                </button>
              </label>
              <label className='grid-in-[meal]' htmlFor='meal'>
                <select
                  name='meal'
                  id='meal'
                  className='w-full px-2.5 py-3.5 rounded font-light text-sm disabled:bg-white disabled:opacity-50'
                  onChange={handleChange}
                  disabled={!authorization || carouselError}
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
                  className='w-full px-2.5 py-3.5 rounded font-light text-sm disabled:bg-white disabled:opacity-50'
                  onChange={handleChange}
                  disabled={!authorization || carouselError}
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
                  className='w-full px-2.5 py-3.5 rounded font-light text-sm disabled:bg-white disabled:opacity-50'
                  onChange={handleChange}
                  disabled={!authorization || carouselError}
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
                  className='w-full px-2.5 py-3.5 rounded font-light text-sm disabled:bg-white disabled:opacity-50'
                  onChange={handleChange}
                  disabled={!authorization || carouselError}
                >
                  <option value=''>Time</option>
                  <option value='0-15'>0-15 min.</option>
                  <option value='16-30'>16-30 min.</option>
                  <option value='31-60'>31-60 min.</option>
                  <option value='61%2B'>More than 60 min.</option>
                </select>
              </label>
              <button
                className='grid-in-[search] bg-lightblue text-darkblue rounded flex justify-center items-center disabled:opacity-50'
                type='submit'
                disabled={!authorization || carouselError}
              >
                <span className='mr-2'>Search</span>
                <span>
                  <ArrowRightIcon />
                </span>
              </button>
            </form>
          </section>

          <section className='flex justify-center'>
            {loading ? (
              <span className='flex justify-center text-sm px-8 my-8 w-full max-w-2xl'>
                Loading...
              </span>
            ) : searchError ? (
              <div className='flex justify-center'>
                <span className='flex justify-center text-sm px-8 my-8 w-full max-w-2xl'>
                  Something went wrong during the retrieval of the data, please refresh the page.
                </span>
              </div>
            ) : noRecipesFound ? (
              <div className='flex justify-center'>
                <span className='flex justify-center text-sm px-8 my-8 w-full max-w-2xl'>
                  No recipes have been found.
                </span>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-x-8 max-w-2xl lg:max-w-7xl p-8 lg:px-8 lg:py-14'>
                {recipes &&
                  recipes.map((recipe) => {
                    return (
                      <RecipeCard
                        key={recipe.uri.split('_')[1]}
                        link={`/recipe?id=${recipe.uri.split('_')[1]}`}
                        image={recipe.image}
                        name={recipe.label}
                        calories={recipe.calories}
                        ingredients={recipe.ingredients.length}
                        time={recipe.totalTime}
                      />
                    );
                  })}
              </div>
            )}
          </section>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
