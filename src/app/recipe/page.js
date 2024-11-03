'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function RecipeInfo() {
  const searchParams = useSearchParams();
  const [id, setId] = useState(null);

  useEffect(() => {
    if (searchParams) {
      const recipeId = searchParams.get('id');
      setId(recipeId);
    }
  }, [searchParams]);

  return <div>{id}</div>;
}

export default function Recipe() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecipeInfo />
    </Suspense>
  );
}
