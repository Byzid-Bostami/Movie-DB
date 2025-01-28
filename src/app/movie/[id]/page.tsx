import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaStar } from "react-icons/fa6";
import YoutubeTrailer from '@/components/YoutubeTrailer';
import Casts from '@/components/Casts';
import Head from 'next/head';



export const datafetcht = async ({ params }: { params: { id: string } }) => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    throw new Error('API key is not defined');
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`);
    return response.data;
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

{/*meta data */}




export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const moviedata = await datafetcht({ params });

    return {
      title: `${moviedata.title} | Movie Details`,
      description: moviedata.overview || "Movie details and description.",
      openGraph: {
        title: moviedata.title,
        description: moviedata.overview,
        images: [
          {
            url: `https://image.tmdb.org/t/p/w500${moviedata.poster_path}`,
            width: 500,
            height: 750,
            alt: moviedata.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error | Movie Details',
      description: 'Failed to load movie details.',
    };
  }
}










const Page = async ({ params }: { params: { id: string } }) => {
  try {
    const moviedata = await datafetcht({ params });
    console.log('Movie data received in page:', moviedata);

    return (
      <>
      <Head>
        <title>{moviedata.title} | Movie Details</title>
        <meta name="description" content={moviedata.overview} />
        <meta property="og:title" content={moviedata.title} />
        <meta property="og:description" content={moviedata.overview} />
        <meta property="og:image" content={moviedata.poster_path} />
      </Head>

      <div className="bg-gradient-to-r from-cyan-800 via-sky-500 to-pink-500 2xl:min-h-screen">

{/* under banner section */}

  <div style={{
    backgroundImage: `url('https://image.tmdb.org/t/p/original/${moviedata.backdrop_path}')`,
    backgroundSize:"cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }} className=' w-full'>

<div className='bg-black/65 '>
<div className='container mx-auto px-3 md:px-8 py-5 lg:px-16'>
  <div  className='grid grid-cols-1 lg:place-items-center md:grid-cols-3 gap-4'>

      <div className='col-span-1 place-self-center md:place-self-start lg:place-self-center'>
        <Image
              className="object-cover rounded-lg w-56 md:w-[300px]"
            src={`https://image.tmdb.org/t/p/w500${moviedata.poster_path}`}
            alt={moviedata.title}
            height={300}
            width={300}
           />
      </div>

      <div  className='md:col-span-2 space-y-2 '>
          <h1 className=' text-white text-3xl font-medium capitalize text-start'>{moviedata.original_title}</h1>
          <p className="text-white text-lg capitalize">
            Genres:{" "}
            <span className="text-neutral-200">
              {moviedata.genres
                ?.map((genre: { id: number; name: string }) => genre.name)
                .join(", ")}
            </span>
            {" "}
            {moviedata.adult === false ? (
              <span className="text-teal-400 border text-sm font-medium  border-white p-[2px] rounded-md">PG</span>
            ) : (
              <span className="text-red-500 border text-sm font-medium  border-white p-[2px] rounded-md">18+</span>
            )}
          </p>

          <p className='text-white text-lg capitalize'>release date: <span className='bg-cyan-600 font-medium text-sm rounded-2xl py-1 px-3'>{moviedata.release_date}</span></p>
          <p className="text-white text-lg capitalize">
            country:{" "}
            <span className="bg-emerald-500 font-medium text-sm rounded-2xl py-1 px-3">
              {Array.isArray(moviedata.origin_country)
                ? moviedata.origin_country.join(" | ")
                : moviedata.origin_country}
            </span>
          </p>

          <p className="text-white text-lg capitalize">
              Duration:{" "}
              <span className="bg-teal-400 font-medium text-sm rounded-2xl py-1 px-3">
                {Math.floor(moviedata.runtime / 60)}h {moviedata.runtime % 60}m
              </span>
            </p>

            <p className='text-white text-lg capitalize flex items-center pb-5 space-x-1'><span>rating:</span> <span className='text-neutral-200 bg-rose-500 font-medium text-sm rounded-2xl py-1 px-2'>{moviedata.vote_average.toFixed(1)}</span> <span className='text-yellow-400 pl-1'><FaStar /></span></p>

           <div className='space-y-3'>
            <h3 className='text-white inline-block  font-semibold text-xl capitalize bg-lime-500 px-3 py-1 rounded-2xl'>Overview</h3>
            <p className='text-zinc-200 text-lg'>{moviedata.overview}</p>
           </div>


      </div>
  </div>
</div>
</div>

  </div>



  {/* youtube trailer section */}

    <div className='container mx-auto px-3 md:px-8 py-5 lg:px-16'>
         <div className='flex justify-center'>
         <YoutubeTrailer params={params} />
         </div>
    </div>


  {/* casts section */}


<div className='bg-white py-5'>
  <div className='container mx-auto px-3 md:px-8 lg:px-16'>     
  <Casts params={params} />
  </div>
</div>




</div></>
    );
  } catch (error) {
    console.error('Error in Page component:', error);
    return <div>Error loading movie data</div>;
  }
};

export default Page;
