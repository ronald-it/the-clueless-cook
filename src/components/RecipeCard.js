import CustomImage from './CustomImage/CustomImage';

export default function RecipeCard({recipeTitle}) {
  return (
    <article className='swiper-slide w-[90%] shadow-3xl rounded-md'>
      <CustomImage
        src='/images/lobster.jpg'
        alt='Lobster image'
        className='w-full h-40 object-cover rounded-t-md'
        width={100}
        height={100}
      />
      <div className='p-4 text-xs text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200'>
        <span className='font-semibold'>{recipeTitle}</span>
        <div className='mt-2 flex justify-between'>
          <div className='flex'>
            <span className='mr-2'>300 Calories</span>
            <span>10 Ingredients</span>
          </div>
          <span>20 Min</span>
        </div>
      </div>
    </article>
  );
}
