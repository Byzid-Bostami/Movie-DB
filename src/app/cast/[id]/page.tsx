import React from 'react';
import { datafetch } from '@/components/Casts';
import Image from 'next/image';
import { datafetcht } from '@/app/movie/[id]/page';

type User = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const cast = await datafetch({ params });
  const title = await datafetcht({ params });

  return (
    <div className="bg-gradient-to-r from-cyan-800 via-sky-500 to-pink-500 min-h-screen">
      <div className="container mx-auto px-3 md:px-8 py-5 lg:px-16">
        <div className="space-x-3">
          <h2 className="md:text-xl font-medium capitalize inline-block text-white">
            All Cast Members of 
          </h2>
          <h2 className="md:text-xl font-medium capitalize bg-cyan-700 shadow-sm shadow-black py-1 px-3 rounded-3xl inline-block text-white">
            &quot;{title.original_title}&quot;
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
          {cast.map((cast: User) => (
            <div
              key={cast.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                className="object-cover w-full h-48"
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                    : '/placeholder.png' // Use a placeholder image for missing paths
                }
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
      </div>
    </div>
  );
};

export default Page;
