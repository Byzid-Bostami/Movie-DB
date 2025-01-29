import React from "react";
import Image from "next/image";
import axios from "axios";

// Define User type
type User = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

// Function to fetch cast data
const fetchCast = async (id: string): Promise<User[]> => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error("API key is not defined");
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data.cast || [];
  } catch (error) {
    console.error("Error fetching cast data:", error);
    throw new Error("Failed to fetch cast data");
  }
};

// Function to fetch movie title
const fetchMovie = async (id: string) => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error("API key is not defined");
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw new Error("Failed to fetch movie data");
  }
};

// Define the Page component with correct TypeScript typing
const Page = async ({ params }: { params: { id: string } }) => {
  const cast = await fetchCast(params.id);
  const movie = await fetchMovie(params.id);

  return (
    <div className="bg-gradient-to-r from-cyan-800 via-sky-500 to-pink-500 min-h-screen">
      <div className="container mx-auto px-3 md:px-8 py-5 lg:px-16">
        <div className="space-x-3">
          <h2 className="md:text-xl font-medium capitalize inline-block text-white">
            All Cast Members of
          </h2>
          <h2 className="md:text-xl font-medium capitalize bg-cyan-700 shadow-sm shadow-black py-1 px-3 rounded-3xl inline-block text-white">
            &quot;{movie.original_title}&quot;
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
          {cast.map((castMember: User) => (
            <div
              key={castMember.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                className="object-cover w-full h-48"
                src={
                  castMember.profile_path
                    ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
                    : "/placeholder.png" // Placeholder for missing images
                }
                alt={castMember.name}
                height={300}
                width={300}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {castMember.name}
                </h2>
                <p className="text-sm text-gray-600 truncate">
                  Char: {castMember.character}
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
