'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy p-4 text-center">
      <h2 className="text-4xl font-display font-light text-gold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-200"
      >
        Try again
      </button>
    </div>
  );
}
