import Image from 'next/image'
import heroImage from '../../public/images/hero-image.jpg'
import RecipeCard from '@/components/RecipeCard'

export default function Home() {
  // Declare request variables for type, query, URI, endpoint, API ID and API Key
  const URI = 'https://api.edamam.com';
  const endpoint = '/api/recipes/v2';
  const API_ID = '44920bbe';
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const query = 'potato'
  const type = 'public'

  async function fetchData() {
    try {
      const response = await fetch(`${URI}${endpoint}?type=${type}&app_id=${API_ID}&app_key=${API_KEY}&q=${query}`)
      const recipes = await response.json()
      console.log(recipes)
    } catch (err) {
      console.log(err)
    }
  }
  

  fetchData()

  return (
    <>
    <header className='flex flex-col'>
    <div className='border-2 border-red-500 bg-projectWhite flex justify-between items-center py-3 px-1'>
    <h1 className='text-xl text-projectBlue'>The Clueless Cook</h1>
      <nav>
        <ul className='flex text-xs [&>*]:pl-2 text-projectBlack'>
          <li>Home</li>
          <li>About</li>
          <li>Calculator</li>
        </ul>
      </nav>
    </div>
    <div className='relative'>
    <Image src={heroImage} alt='Hero image' priority={true} />
    <span className='absolute top-3 left-1 text-white text-sm'>Delicious Recipes.</span>
    <span className='absolute top-8 left-1 text-white text-sm'>Daily Updated.</span>
    <button className='absolute top-14 left-1 bg-projectCyan text-xs p-1 rounded-sm'>Find Recipes</button>
    </div>
    </header>
    <main className='border-2 border-blue-500'>
      <RecipeCard/>
    </main>
    </>
  )
}
