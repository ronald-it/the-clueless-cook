'use client';
import { useSearchParams } from 'next/navigation';

export default function RecipePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return <div>{id}</div>;
}
