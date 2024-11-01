import Link from 'next/link';
import CustomImage from './CustomImage/CustomImage';

export default function RecipeCard({ link, image, name, calories, ingredients, time }) {
  return (
        <Link href={link} className='swiper-slide'>
          <article className='rounded-md shadow-3xl'>
            <CustomImage
              src={image}
              alt={`${name} recipe image`}
              className='w-full h-40 object-cover rounded-t-md'
              width={100}
              height={100}
            />
            <div className='py-4 px-2 text-xs text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200 rounded-b-md'>
              <div className='w-[99%] truncate'>
                <span className='font-semibold w-4'>{name}</span>
              </div>
              <div className='mt-2 flex justify-between'>
                <div className='flex'>
                  <span className='mr-0.5 font-semibold'>{Math.round(calories)}</span>
                  <span>Kcal</span>
                  <span className='mx-1'>|</span>
                  <span className='mr-0.5 font-semibold'>{ingredients}</span>
                  <span>Ingredients</span>
                </div>
                <div className='flex'>
                  <span className='w-4 mr-1'>
                    <CustomImage
                      src='/images/time.svg'
                      alt='Clock icon'
                      width={100}
                      height={100}
                      className='w-full'
                    />
                  </span>
                  <div>
                    <span className='mr-0.5 font-semibold'>{time}</span>
                    <span>min.</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Link>
  );
}
