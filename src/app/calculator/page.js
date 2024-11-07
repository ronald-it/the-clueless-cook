import CustomImage from '../../components/CustomImage/CustomImage';

export default function Calculator() {
  return (
    <div className='p-8 flex flex-col gap-y-8'>
      <h2 className='text-2xl text-darkblue font-bold'>Calorie Calculator</h2>

      <section>
        <form className='flex flex-col gap-y-2'>
          <label>
            <div className='relative'>
              <input
                type='search'
                placeholder='Barcode / product'
                className='border-[0.1rem] border-black rounded w-full placeholder:text-xs placeholder:text-gray-600 p-2'
              />
              <CustomImage
                src='/images/search.png'
                alt='Clock icon'
                width={100}
                height={100}
                className='w-5 h-5 absolute top-0 translate-y-1/2 right-4'
              />
            </div>
          </label>
          <button className='bg-lightblue text-darkblue border-[0.1rem] border-darkblue font-bold w-full text-xs py-2 rounded'>
            Search
          </button>
        </form>
      </section>

      <section>
        <table className='w-full text-xs'>
          <thead>
            <tr>
              <th>
                <div className='flex'>Product</div>
              </th>
              <th>
                <div className='flex'>Quantity</div>
              </th>
              <th>
                <div className='flex'>Label</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='mt-2'>Mars</div>
              </td>
              <td>
                <div className='mt-2'>60</div>
              </td>
              <td>
                <div className='mt-2'>Gram</div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <form className='flex justify-between text-xs gap-x-2 h-8 [&>*]:h-full [&>*]:flex [&>*]:items-center'>
          <label className='flex items-center'>Amount</label>
          <span>
            <input type='number' className='w-full h-full border-[0.1rem] border-black rounded' />
          </span>
          <span>Serving(s)</span>
          <button className='bg-lightblue text-darkblue border-[0.1rem] border-darkblue font-bold text-xs rounded whitespace-nowrap px-2'>
            <span className='mr-2'>+</span>
            <span>Add</span>
          </button>
        </form>
      </section>

      <section>
        <table className='w-full text-xs'>
          <thead>
            <tr>
              <th>
                <div className='flex'>Product</div>
              </th>
              <th>
                <div className='flex'>Calories</div>
              </th>
              <th>
                <div className='flex'>Fat</div>
              </th>
              <th>
                <div className='flex'>Carbs</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='mt-2'>Milk</div>
              </td>
              <td>
                <div className='mt-2'>149 kcal</div>
              </td>
              <td>
                <div className='mt-2'>8 g</div>
              </td>
              <td>
                <div className='mt-2'>12 g</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='mt-2'>Mars</div>
              </td>
              <td>
                <div className='mt-2'>234 kcal</div>
              </td>
              <td>
                <div className='mt-2'>12 g</div>
              </td>
              <td>
                <div className='mt-2'>31 g</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='mt-2'>Total</div>
              </td>
              <td>
                <div className='mt-2'>383 kcal</div>
              </td>
              <td>
                <div className='mt-2'>20 g</div>
              </td>
              <td>
                <div className='mt-2'>43 g</div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
