'use client';
import { useEffect, useState } from 'react';
import CustomImage from '../../components/CustomImage/CustomImage';
import axios from 'axios';

// Declare variables for URI, endpoint, API ID and API Key
const URI = 'https://api.edamam.com';
const endpoint = '/api/food-database/v2/parser';
const API_ID = 'ec73a27a';
const API_KEY = '270cc5a42e9022d3b8f92f30feed3e6e';

export default function Calculator() {
  const [productInput, setProductInput] = useState();
  const [products, setProducts] = useState([]);

  const fetchProduct = async (input) => {
    try {
      const response = await axios.get(`${URI}${endpoint}`, {
        params: {
          type: 'public',
          app_id: API_ID,
          app_key: API_KEY,
          ingr: input,
        },
      });
      setProducts([...products, response.data.parsed[0].food]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => console.log(products), [products]);

  useEffect(() => console.log(productInput), [productInput]);

  return (
    <div className='p-8 flex flex-col gap-y-8'>
      <h2 className='text-2xl text-darkblue font-bold'>Calorie Calculator</h2>

      <section>
        <form
          className='flex flex-col gap-y-2'
          onSubmit={(e) => {
            e.preventDefault();
            fetchProduct(productInput);
          }}
        >
          <label>
            <div className='relative'>
              <input
                type='search'
                placeholder='Barcode / product'
                className='border-[0.1rem] border-black text-xs rounded w-full placeholder:text-xs placeholder:text-gray-600 p-2'
                onChange={(e) => setProductInput(e.target.value)}
              />
              <CustomImage
                src='/images/search.png'
                alt='Clock icon'
                width={100}
                height={100}
                className='w-5 h-5 absolute top-0 translate-y-1/3 right-4'
              />
            </div>
          </label>
          <button
            className='bg-lightblue text-darkblue border-[0.1rem] border-darkblue font-bold w-full text-xs py-2 rounded'
            type='submit'
          >
            Search
          </button>
        </form>
      </section>

      {products.length > 0 && (
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
              {products.map((product) => {
                return (
                  <tr key={product.foodId}>
                    <td>
                      <div className='mt-2'>{product.label}</div>
                    </td>
                    <td>
                      <div className='mt-2'>100</div>
                    </td>
                    <td>
                      <div className='mt-2'>Gram</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}

      <section>
        <form className='flex justify-between text-xs gap-x-2 h-8 [&>*]:h-full [&>*]:flex [&>*]:items-center'>
          <label className='flex items-center'>Amount</label>
          <span>
            <input
              type='number'
              className='w-full h-full text-xs border-[0.1rem] border-black rounded'
            />
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
