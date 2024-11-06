'use client';
import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import CustomImage from '../../components/CustomImage/CustomImage';
import Image from 'next/image';

// Declare variables for URI, API ID, and API Key
const URI = 'https://api.edamam.com';
const API_ID = '44920bbe';
const API_KEY = 'e0b07558906ed952fb1226ace4bc0227';

function RecipeContent({ id }) {
  // Initialize useState for recipe data
  const [recipe, setRecipe] = useState(null);

  // Fetch the recipe data using the provided ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${URI}/api/recipes/v2/${id}`, {
          params: {
            type: 'public',
            app_id: API_ID,
            app_key: API_KEY,
          },
        });
        setRecipe(response.data.recipe);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (!recipe) return <div>Loading recipe...</div>;

  return (
    <article className='flex flex-col p-6 gap-6 text-darkblue sm:grid sm:grid-areas-[recipe_recipe,lorem_lorem,image_nutrients,ingredients_labels] sm:grid-cols-2'>
      <section className='flex flex-wrap gap-x-6 sm:grid-in-[recipe]'>
        <h2 className='text-lg font-bold'>{recipe.label}</h2>
        <div className='flex items-center'>
          <CustomImage
            src='images/time.svg'
            alt='Clock icon'
            className='w-4 h-4 mr-1'
            width={100}
            height={100}
          />
          <h3 className='text-base'>
            <span className='font-bold mr-1'>{recipe.totalTime}</span>
            <span className='font-normal'>min.</span>
          </h3>
        </div>
      </section>

      <section className='font-normal text-black sm:grid-in-[lorem]'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices venenatis
          mauris in ultrices. Sed nec tristique leo. Praesent luctus elit et pulvinar sagittis.
          Suspendisse suscipit arcu quis libero rutrum posuere. Aliquam facilisis dapibus nunc, nec
          aliquet sapien congue at. Morbi tempus massa purus, et ultricies eros egestas at.
          Phasellus a pharetra nibh, ac imperdiet arcu. Suspendisse sollicitudin laoreet lectus.
        </p>
        <p className='hidden sm:block sm:mt-4'>
          Vivamus ullamcorper ultrices tortor, ut maximus velit facilisis ac. Nullam ac est diam.
          Nullam eget sapien eu est volutpat auctor ac posuere neque. Pellentesque condimentum
          turpis erat, sed elementum diam sodales vitae. Nullam semper quis nulla eget ullamcorper.
          Quisque pretium aliquet nunc at interdum. Pellentesque accumsan magna dignissim, sodales
          nibh at, condimentum mauris. Donec ac semper urna. Nam ut neque.
        </p>
      </section>

      <section className='sm:grid-in-[image]'>
        <Image
          src={recipe.image}
          alt={`${recipe.label} image`}
          width={100}
          height={100}
          className='w-full'
        />
      </section>

      <section className='grid-in-[ingredients]'>
        <h3>Ingredients</h3>
        <ul className='list-inside'>
          {recipe.ingredientLines.map((ingredient, index) => (
            <li
              className={`before:content-['•'] before:mr-2 before:text-darkblue before:text-3xl flex items-center`}
              key={index}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </section>

      <section className='sm:grid-in-[nutrients] flex flex-col'>
        <h3>Nutrients</h3>
        <ul className='list-inside sm:h-full sm:flex sm:flex-col sm:justify-between'>
          <li
            className={`before:content-['•'] before:mr-2 before:text-darkblue before:text-3xl flex items-center`}
          >
            <div className='flex w-full justify-between'>
              <span>Energy</span>
              <span>{Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)} kcal</span>
            </div>
          </li>
          <li
            className={`before:content-['•'] before:mr-2 before:text-darkblue before:text-3xl flex items-center`}
          >
            <div className='flex w-full justify-between'>
              <span>Fat</span>
              <span>{Math.round(recipe.totalNutrients.FAT.quantity)} g</span>
            </div>
          </li>
          <li
            className={`before:content-['•'] before:mr-2 before:text-darkblue before:text-3xl flex items-center`}
          >
            <div className='flex w-full justify-between'>
              <span>Carbs</span>
              <span>{Math.round(recipe.totalNutrients.CHOCDF.quantity)} g</span>
            </div>
          </li>
          <li
            className={`before:content-['•'] before:mr-2 before:text-darkblue before:text-3xl flex items-center`}
          >
            <div className='flex w-full justify-between'>
              <span>Sugar</span>
              <span>{Math.round(recipe.totalNutrients.SUGAR.quantity)} g</span>
            </div>
          </li>
          <li
            className={`before:content-['•'] before:mr-2 before:text-darkblue before:text-3xl flex items-center`}
          >
            <div className='flex w-full justify-between'>
              <span>Protein</span>
              <span>{Math.round(recipe.totalNutrients.PROCNT.quantity)} g</span>
            </div>
          </li>
          <li
            className={`before:content-['•'] before:mr-2 before:text-darkblue before:text-3xl flex items-center`}
          >
            <div className='flex w-full justify-between'>
              <span>Sodium</span>
              <span>{Math.round(recipe.totalNutrients.NA.quantity)} mg</span>
            </div>
          </li>
        </ul>
      </section>

      <section className='sm:grid-in-[labels]'>
        <h3 className='mb-2'>Health labels</h3>
        <ul className='flex flex-wrap gap-2'>
          {recipe.healthLabels.map((healthLabel, index) => (
            <li className='border-2 border-darkblue bg-lightblue text-xs p-2 rounded-3xl font-semibold' key={index}>{healthLabel}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default function RecipePage() {
  const searchParams = useSearchParams();
  const [id, setId] = useState(null);

  useEffect(() => {
    if (searchParams) {
      const recipeId = searchParams.get('id');
      setId(recipeId);
    }
  }, [searchParams]);

  if (!id) return <div>Loading...</div>;

  return (
    <Suspense fallback={<div>Loading recipe details...</div>}>
      <RecipeContent id={id} />
    </Suspense>
  );
}
