"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function HomeUser() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <>
      <h1>Home User</h1>
      {message && <h1>{decodeURIComponent(message)}</h1>}
    </>
  );
}
