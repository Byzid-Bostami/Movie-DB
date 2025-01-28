import React from 'react';
import axios from 'axios';

type Video = {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
};

const datafetch = async ({ params }: { params: { id: string } }) => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    throw new Error('API key is not defined');
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${API_KEY}&language=en-US`
    );
    return response.data.results || [];
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

const YoutubeTrailer = async ({ params }: { params: { id: string } }) => {
  const videos: Video[] = await datafetch({ params });

  const trailer = videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube');

  if (!trailer) {
    return <div>No trailer available</div>;
  }

  return (
    <div>
      <iframe
        className="w-screen md:w-[670px] md:h-[390px]"
        width="560"
        height="325"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeTrailer;
