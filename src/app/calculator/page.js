'use client';
import { useContext, useEffect, useState } from 'react';
import CustomImage from '../../components/CustomImage/CustomImage';
import axios from 'axios';
import ArrowRightIcon from '../../components/icons/ArrowRightIcon';
import { AuthContext } from '../../context/AuthContext';

// Declare variables for URI, endpoint, API ID and API Key
const URI = 'https://api.edamam.com';
const endpoint = '/api/food-database/v2/parser';
const API_ID = 'ec73a27a';
const API_KEY = '270cc5a42e9022d3b8f92f30feed3e6e';

export default function Calculator() {
  // Declare useContext variable
  const { authorization } = useContext(AuthContext);

  // Initialize useState
  const [productInput, setProductInput] = useState();
  const [servingSize, setServingSize] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [totalMacros, setTotalMacros] = useState({ calories: 0, fat: 0, carbs: 0 });
  const [error, toggleError] = useState(false);

  // Handle changes in product input
  const handleProductInput = (event) => {
    setProductInput(event.target.value);
  };

  // Handle changes in serving size
  const handleServingSize = (event) => {
    setServingSize(event.target.value);
  };

  // Handle submission of product input
  const handleProductFetch = (event) => {
    event.preventDefault();
    fetchProduct(productInput);
  };

  // Handle submission of serving size to set the added products state
  const handleCalculation = (event) => {
    event.preventDefault();

    const productsWithServingSize = searchResults.map((product) => ({
      ...product,
      servingSize: parseInt(servingSize),
    }));

    setAddedProducts((prevAddedProducts) => [...prevAddedProducts, ...productsWithServingSize]);

    setSearchResults([]);
  };

  // Function to retrieve product based on the user's product input
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
      setSearchResults([...searchResults, response.data.parsed[0].food]);
    } catch (error) {
      toggleError(true);
    }
  };

  // useEffect that calculates the calorie, fat and carbs totals for the calorie table
  useEffect(() => {
    const totalCalories = addedProducts
      .map((product) => Math.round(product.nutrients.ENERC_KCAL * product.servingSize))
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    const totalFat = addedProducts
      .map((product) => Math.round(product.nutrients.FAT * product.servingSize))
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    const totalCarbs = addedProducts
      .map((product) => Math.round(product.nutrients.CHOCDF * product.servingSize))
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

    setTotalMacros({ calories: totalCalories, fat: totalFat, carbs: totalCarbs });
  }, [addedProducts]);

  return (
    <div className='flex justify-center py-6'>
      <div className='px-8 flex flex-col gap-y-8 w-full sm:max-w-2xl lg:max-w-7xl'>
        {!authorization ? (
          <span>Please log in to access the calorie calculator</span>
        ) : (
          <>
            <h2 className='text-2xl lg:text-3xl text-darkblue font-bold'>Calorie Calculator</h2>

            <section>
              <form
                className='flex flex-col gap-y-2 sm:flex-row sm:gap-x-2 sm:max-w-md'
                onSubmit={handleProductFetch}
              >
                <label className='sm:w-full' htmlFor='product'>
                  <div className='relative'>
                    <input
                      type='search'
                      id='product'
                      placeholder='Barcode / product'
                      className='border-[0.1rem] border-black rounded w-full placeholder:text-gray-600 p-2'
                      onChange={handleProductInput}
                    />
                    <button className='h-full w-5 absolute right-4' type='submit'>
                      <CustomImage
                        src='/images/search.png'
                        alt='Clock icon'
                        width={100}
                        height={100}
                      />
                    </button>
                  </div>
                </label>
                <button
                  className='relative bg-lightblue text-darkblue border-[0.1rem] border-darkblue font-bold w-full sm:w-40 text-xs sm:text-base py-2 rounded flex justify-center items-center'
                  type='submit'
                >
                  <span className='mr-2'>Search</span>
                  <span>
                    <ArrowRightIcon />
                  </span>
                </button>
              </form>
            </section>

            {error && (
              <span className='text-xs font-bold text-red-500'>
                An error has occurred, please refresh the page and try again.
              </span>
            )}

            {searchResults?.length > 0 && (
              <section>
                <table className='w-full text-xs lg:text-base sm:max-w-xs'>
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
                    {searchResults.map((product) => {
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
              <form
                className='flex justify-between sm:justify-start gap-x-2 sm:gap-x-4 h-8 [&>*]:h-full [&>*]:flex [&>*]:items-center'
                onSubmit={handleCalculation}
              >
                <label className='flex items-center text-xs sm:text-base' htmlFor='amount'>
                  Amount
                </label>
                <span>
                  <input
                    type='number'
                    id='amount'
                    className='w-full h-full border-[0.1rem] border-black rounded p-2'
                    onChange={handleServingSize}
                  />
                </span>
                <span className='text-xs sm:text-base'>Serving(s)</span>
                <button
                  className='bg-lightblue text-darkblue border-[0.1rem] border-darkblue font-bold rounded whitespace-nowrap px-2 sm:px-4'
                  type='submit'
                >
                  <span className='mr-2 font-light text-xl'>+</span>
                  <span className='text-xs sm:text-base'>Add</span>
                </button>
              </form>
            </section>

            {addedProducts?.length > 0 && (
              <section>
                <table className='w-full text-xs lg:text-base sm:max-w-2xl'>
                  <thead>
                    <tr>
                      <th className='sm:w-1/4'>
                        <div className='flex'>Product</div>
                      </th>
                      <th className='sm:w-1/4'>
                        <div className='flex'>Calories</div>
                      </th>
                      <th className='sm:w-1/4'>
                        <div className='flex'>Fat</div>
                      </th>
                      <th className='sm:w-1/4'>
                        <div className='flex'>Carbs</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {addedProducts.map((product, index) => {
                      return (
                        <tr key={product.foodId}>
                          <td>
                            <div
                              className={`${index == addedProducts.length - 1 ? 'my-2' : 'mt-2'}`}
                            >
                              {product.label}
                            </div>
                          </td>
                          <td>
                            <div
                              className={`${index == addedProducts.length - 1 ? 'my-2' : 'mt-2'}`}
                            >
                              {Math.round(product.nutrients.ENERC_KCAL * product.servingSize)} kcal
                            </div>
                          </td>
                          <td>
                            <div
                              className={`${index == addedProducts.length - 1 ? 'my-2' : 'mt-2'}`}
                            >
                              {Math.round(product.nutrients.FAT * product.servingSize)} g
                            </div>
                          </td>
                          <td>
                            <div
                              className={`${index == addedProducts.length - 1 ? 'my-2' : 'mt-2'}`}
                            >
                              {Math.round(product.nutrients.CHOCDF * product.servingSize)} g
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className='border-t-[0.1rem] border-black'>
                      <td>
                        <div className='mt-2'>Total</div>
                      </td>
                      <td>
                        <div className='mt-2'>{totalMacros.calories} kcal</div>
                      </td>
                      <td>
                        <div className='mt-2'>{totalMacros.fat} g</div>
                      </td>
                      <td>
                        <div className='mt-2'>{totalMacros.carbs} g</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
