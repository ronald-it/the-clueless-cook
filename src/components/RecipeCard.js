import Link from 'next/link';
import CustomImage from './CustomImage/CustomImage';
import Image from 'next/image';

export default function RecipeCard({
  link,
  image,
  name,
  calories,
  ingredients,
  time,
  gradientRight = false,
  gradientLeft = false,
  index
}) {
  return (
    <article className={`rounded-md shadow-3xl basis-[18rem] grow max-w-[24rem] lg:max-w-[28rem] swiper-slide ${index == 1 && '-mx-2 z-[9998]'} bg-white`}>
      <Link href={link}>
        <Image
          src={image}
          alt={`${name} recipe image`}
          className={`w-full h-40 lg:h-52 ${(index == 0 || index == 2) && 'lg:h-[10rem]'} object-cover rounded-t-md`}
          width={100}
          height={100}
        />
        <div
          className={`py-4 px-2 lg:px-6 text-xs text-gray-800 bg-gradient-to-b ${
            gradientRight ? 'lg:bg-gradient-to-r' : gradientLeft ? 'lg:bg-gradient-to-l' : ''
          } from-gray-100 to-gray-200 rounded-b-md`}
        >
          <div className='w-[99%] truncate'>
            <span className='font-semibold w-4 lg:text-base'>{name}</span>
          </div>
          <div className='mt-2 flex justify-between'>
            <div className='flex items-center lg:[&>*]:text-sm'>
              <span className='mr-0.5 font-semibold'>{Math.round(calories)}</span>
              <span>Kcal</span>
              <span className='mx-1'>|</span>
              <span className='mr-0.5 font-semibold'>{ingredients}</span>
              <span>Ingredients</span>
            </div>
            <div className='flex lg:[&>*]:text-sm'>
              <span className='w-4 mr-1 flex'>
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
      </Link>
    </article>
  );
}
