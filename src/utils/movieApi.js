import { movieApiKey } from "./apiKey";
import axios from "axios";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMovieEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${movieApiKey}`;

//Api call to get Movies

const movieApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    // // console.log("Text 1", response.data.results);
    // console.log("This works", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchTrendingMovie = () => {
  return movieApiCall(trendingMovieEndpoint);
};
