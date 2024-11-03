'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecipePage() {
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
