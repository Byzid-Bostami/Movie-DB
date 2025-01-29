import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";

type User = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

 const datafetch = async ({ params }: { params: { id: string } }) => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    throw new Error('API key is not defined');
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${API_KEY}&language=en-US`);
    console.log('Movie data fetched:', response.data);
    return response.data.cast || [];
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
      throw new Error('Failed to fetch data');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

const Casts = async ({ params }: { params: { id: string } }) => {
  const casts = await datafetch({ params });
  const limitedCasts = casts.slice(0, 8);
  return (
    <>
    <h2 className='text-xl font-medium capitalize bg-teal-500 py-1 px-3 rounded-3xl inline-block text-white'>Top cast</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
      {limitedCasts.map((cast: User) => (
        <div
          key={cast.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <Image
            className="object-cover w-full h-48"
            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
            alt={cast.name}
            height={300}
            width={300}
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {cast.name}
            </h2>
            <p className="text-sm text-gray-600 truncate">
            Char: {cast.character}
            </p>
          </div>
        </div>
      ))}
    </div>
    <Link href={`/cast/${params.id}`}>
      <p className='text-xl font-medium capitalize flex items-center space-x-3 justify-center'><span className='bg-black text-white py-1 px-3 rounded-2xl hover:bg-lime-600 hover:shadow-md hover:shadow-black transition-all duration-150'>view all cast</span> <span className=' animate-ping text-black'><FaArrowRightLong /></span></p>
      </Link>
    </>
  );
};

export default Casts;
