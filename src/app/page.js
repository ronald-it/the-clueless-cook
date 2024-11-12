'use client';
import { useContext, useEffect, useState } from 'react';
import CustomImage from '../components/CustomImage/CustomImage';
import ArrowRightIcon from '../components/icons/ArrowRightIcon';
import Slider from '../components/Slider/Slider';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { smoothScrollToSection } from '../utils/smoothScrollToSection';
import SelectMenu from '../components/SelectMenu/SelectMenu';

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

  // Options for the meal type select menu
  const mealTypeOptions = [
    { value: '', label: 'Meal type' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'brunch', label: 'Brunch' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' },
    { value: 'teatime', label: 'Tea time' },
  ];

  // Options for the cuisine type select menu
  const cuisineTypeOptions = [
    { value: '', label: 'Cuisine' },
    { value: 'american', label: 'American' },
    { value: 'asian', label: 'Asian' },
    { value: 'british', label: 'British' },
    { value: 'caribbean', label: 'Caribbean' },
    { value: 'central europe', label: 'Central Europe' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'eastern europe', label: 'Eastern Europe' },
    { value: 'french', label: 'French' },
    { value: 'greek', label: 'Greek' },
    { value: 'indian', label: 'Indian' },
    { value: 'italian', label: 'Italian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'middle eastern', label: 'Middle Eastern' },
    { value: 'nordic', label: 'Nordic' },
    { value: 'south american', label: 'South American' },
    { value: 'south east asian', label: 'South East Asian' },
    { value: 'world', label: 'World' },
  ];

  // Options for the diet type select menu
  const dietTypeOptions = [
    { value: '', label: 'Diet' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'high-fiber', label: 'High-Fiber' },
    { value: 'high-protein', label: 'High-Protein' },
    { value: 'low-carb', label: 'Low-Carb' },
    { value: 'low-fat', label: 'Low-Fat' },
    { value: 'low-sodium', label: 'Low-Sodium' },
  ];

  // Options for the time select menu
  const timeOptions = [
    { value: '', label: 'Time' },
    { value: '0-15', label: '0-15 min.' },
    { value: '16-30', label: '16-30 min.' },
    { value: '31-60', label: '31-60 min.' },
    { value: '61%2B', label: 'More than 60 min.' },
  ];

  // Handle changes in recipe search input
  const handleSearchChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes in SelectMenu (react-select) elements
  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormState({
      ...formState,
      [actionMeta.name]: selectedOption.value,
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
              className='p-8 grid grid-areas-[recipe_recipe,meal_cuisine,diet_time,search_search] grid-cols-2 grid-rows-4 gap-y-5 gap-x-1 [&>*:last-child]:font-semibold lg:[&>*:first-child]:w-[100rem] xl:[&>*:first-child]:w-[150rem] w-full max-w-2xl lg:max-w-7xl lg:gap-y-0 lg:gap-x-6 lg:flex lg:[&>*]:w-full [&>*]:h-12'
              onSubmit={handleSubmit}
            >
              <label className='grid-in-[recipe] relative' htmlFor='recipe'>
                <input
                  name='recipe'
                  id='recipe'
                  className='w-full pl-2.5 pr-12 lg:pr-6 py-3.5 rounded font-light text-base lg:h-full disabled:bg-white disabled:opacity-50'
                  type='search'
                  placeholder='Recipe search'
                  onChange={handleSearchChange}
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
                <SelectMenu
                  name='meal'
                  id='meal'
                  defaultValue={mealTypeOptions[0]}
                  onChange={handleSelectChange}
                  options={mealTypeOptions}
                  disabled={!authorization || carouselError}
                />
              </label>
              <label className='grid-in-[cuisine]' htmlFor='cuisine'>
                <SelectMenu
                  name='cuisine'
                  id='cuisine'
                  defaultValue={cuisineTypeOptions[0]}
                  onChange={handleSelectChange}
                  options={cuisineTypeOptions}
                  disabled={!authorization || carouselError}
                />
              </label>
              <label className='grid-in-[diet]' htmlFor='diet'>
                <SelectMenu
                  name='diet'
                  id='diet'
                  defaultValue={dietTypeOptions[0]}
                  onChange={handleSelectChange}
                  options={dietTypeOptions}
                  disabled={!authorization || carouselError}
                />
              </label>
              <label className='grid-in-[time]' htmlFor='time'>
                <SelectMenu
                  name='time'
                  id='time'
                  defaultValue={timeOptions[0]}
                  onChange={handleSelectChange}
                  options={timeOptions}
                  disabled={!authorization || carouselError}
                />
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
                {authorization &&
                  recipes &&
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
