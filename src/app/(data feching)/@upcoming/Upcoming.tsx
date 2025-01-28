import axios from "axios";

const Upcoming = async () => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    throw new Error("API key is not defined");
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&region=US&_=${new Date().getTime()}`
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

export default Upcoming;