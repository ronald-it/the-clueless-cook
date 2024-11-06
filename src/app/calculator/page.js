import CustomImage from '../../components/CustomImage/CustomImage';

export default function Calculator() {
  return (
    <div className='p-8 flex flex-col gap-y-8 border-2 border-black'>
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
        <table className='w-full'>
          <thead>
            <tr className='[&>*]:border-2'>
              <th>Product</th>
              <th>Quantity</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            <tr className='[&>*]:border-2'>
              <td>Mars</td>
              <td>60</td>
              <td>Gram</td>
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
        <table className='w-full border-2'>
          <thead>
            <tr className='[&>*]:border-2'>
              <th>Product</th>
              <th>Calories</th>
              <th>Fat</th>
              <th>Carbs</th>
            </tr>
          </thead>
          <tbody>
            <tr className='[&>*]:border-2'>
              <td>Milk</td>
              <td>149 kcal</td>
              <td>8 g</td>
              <td>12 g</td>
            </tr>
            <tr className='[&>*]:border-2'>
              <td>Mars</td>
              <td>234 kcal</td>
              <td>12 g</td>
              <td>31 g</td>
            </tr>
            <tr className='[&>*]:border-2'>
              <td>Total</td>
              <td>383 kcal</td>
              <td>20 g</td>
              <td>43 g</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
