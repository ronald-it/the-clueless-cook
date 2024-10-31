import Link from 'next/link';
import CustomImage from './CustomImage/CustomImage';

export default function RecipeCard({ link, image, name, calories, ingredients, time }) {
  return (
    <Link to={link} className='swiper-slide shadow-3xl rounded-md'>
      <article>
        <CustomImage
          src={image}
          alt={`${name} recipe image`}
          className='w-full h-40 object-cover rounded-t-md'
          width={100}
          height={100}
        />
        <div className='p-4 text-xs text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200 rounded-b-md'>
          <span className='font-semibold'>{name}</span>
          <div className='mt-2 flex justify-between'>
            <div className='flex'>
              <span className='mr-2'>{calories} Calories</span>
              <span>{ingredients} Ingredients</span>
            </div>
            <span>{time} Min</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
