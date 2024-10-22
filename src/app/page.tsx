"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectComponent = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return null; // You can also return a loading spinner or similar if needed
};

export default RedirectComponent;
