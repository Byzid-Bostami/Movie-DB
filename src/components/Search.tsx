'use client';
import { useRouter } from 'next/navigation'; // Correct import for `app` directory
import React, { useState } from 'react';

const Search = () => {
  const [movie, setMovie] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (movie.trim()) {
      router.push(`/search?query=${encodeURIComponent(movie)}`);
      setMovie('');
    } else {
      console.log('Please enter a valid search query.');
    }
  };

  return (
    <div className="w-full md:w-auto">
      <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center space-x-2 md:space-x-3">
        <input
          className="rounded-3xl p-2 pl-3 text-xs md:text-base outline-none w-full md:w-auto"
          type="search"
          placeholder="Search Movies"
          aria-label="Search Movies"
          value={movie}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMovie(e.target.value)}
        />
        <button
          className="text-white text-center bg-[#133f63] py-2 px-4 rounded-3xl shadow-sm shadow-black hover:shadow-inner hover:shadow-slate-500 hover:bg-black transition-all duration-200 text-sm md:text-base font-medium"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
