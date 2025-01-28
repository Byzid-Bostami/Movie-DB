'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

type User = {
  id: number;
  poster_path: string | null;
  release_date: string | null;
  title: string | null;
  vote_average: number | null;
};

const SearchPage = () => {
  const [myData, setMyData] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    if (!query || !API_KEY) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        const results = response.data.results || [];
        const validResults = results.filter((item: User) => item.id && item.title);
        setMyData(validResults);
        setIsError(false);
      } catch (error: any) {
        setIsError(true);
        setErrorMessage(error.message || 'An error occurred while fetching data');
      }
    };

    fetchMovies();
  }, [query, API_KEY]);

  return (
    <div className="bg-gradient-to-r from-cyan-800 via-sky-500 to-pink-500 min-h-screen">
      <div className="container mx-auto px-3 md:px-8 py-7 lg:px-16">
        <h2 className="text-white text-lg font-medium capitalize pb-3">
          Search results for <span>"{query}"</span>
        </h2>

        {isError ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : myData.length === 0 ? (
          <p className="text-white text-center font-medium">
            No results found for "<span className="font-bold">{query}</span>"
          </p>
        ) : (
          <div className="space-x-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {myData.map((item) => (
              <div className="text-white" key={item.id}>
                <Link href={`/movie/${item.id}`}>
                  <Image
                    className="object-cover rounded-lg"
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : '/placeholder.jpg'
                    }
                    alt={item.title || 'Movie poster'}
                    height={250}
                    width={250}
                  />
                  <p className="capitalize flex items-center font-medium">
                    Rating:{' '}
                    <span className="text-neutral-200 pl-1">
                      {item.vote_average !== null && item.vote_average !== undefined
                        ? item.vote_average.toFixed(1)
                        : 'N/A'}
                    </span>
                    <span className="text-yellow-400 pl-1">
                      <FaStar />
                    </span>
                  </p>
                  <h2 className="text-xl capitalize font-medium">{item.title || 'Untitled'}</h2>
                  <p className="text-sm capitalize font-medium text-zinc-100">
                    Release: {item.release_date || 'Unknown'}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
