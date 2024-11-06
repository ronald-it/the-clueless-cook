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
    <article className='flex flex-col'>
      <section>
        <h2>{recipe.label}</h2>
        <CustomImage src='images/time.svg' alt='Clock icon' width={100} height={100} />
        <h3>{recipe.totalTime} min.</h3>
      </section>

      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices venenatis
          mauris in ultrices. Sed nec tristique leo. Praesent luctus elit et pulvinar sagittis.
          Suspendisse suscipit arcu quis libero rutrum posuere. Aliquam facilisis dapibus nunc, nec
          aliquet sapien congue at. Morbi tempus massa purus, et ultricies eros egestas at.
          Phasellus a pharetra nibh, ac imperdiet arcu. Suspendisse sollicitudin laoreet lectus.
        </p>
        <p>
          Vivamus ullamcorper ultrices tortor, ut maximus velit facilisis ac. Nullam ac est diam.
          Nullam eget sapien eu est volutpat auctor ac posuere neque. Pellentesque condimentum
          turpis erat, sed elementum diam sodales vitae. Nullam semper quis nulla eget ullamcorper.
          Quisque pretium aliquet nunc at interdum. Pellentesque accumsan magna dignissim, sodales
          nibh at, condimentum mauris. Donec ac semper urna. Nam ut neque.
        </p>
      </section>

      <section>
        <Image src={recipe.image} alt={`${recipe.label} image`} width={100} height={100} />
      </section>

      <section>
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredientLines.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Nutrients</h3>
        <dl>
          <div>
            <dt>Energy</dt>
            <dd>{Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)} kcal</dd>
          </div>
          <div>
            <dt>Fat</dt>
            <dd>{Math.round(recipe.totalNutrients.FAT.quantity)} g</dd>
          </div>
          <div>
            <dt>Carbs</dt>
            <dd>{Math.round(recipe.totalNutrients.CHOCDF.quantity)} g</dd>
          </div>
          <div>
            <dt>Sugar</dt>
            <dd>{Math.round(recipe.totalNutrients.SUGAR.quantity)} g</dd>
          </div>
          <div>
            <dt>Protein</dt>
            <dd>{Math.round(recipe.totalNutrients.PROCNT.quantity)} g</dd>
          </div>
          <div>
            <dt>Sodium</dt>
            <dd>{Math.round(recipe.totalNutrients.NA.quantity)} mg</dd>
          </div>
        </dl>
      </section>

      <section>
        <h3>Health Labels</h3>
        <ul>
          {recipe.healthLabels.map((healthLabel, index) => (
            <li key={index}>{healthLabel}</li>
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
