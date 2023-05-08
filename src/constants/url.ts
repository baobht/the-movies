import apiKey from "./apiKey";

export const API_KEY_PARAMS = `api_key=${apiKey}`;
export const BASE_URL = "https://api.themoviedb.org/3";
export const API_URL = BASE_URL + "/movie";
export const IMG_URL = "https://image.tmdb.org/t/p/w500";
export const searchURL = BASE_URL + "/search/movie?" + API_KEY_PARAMS;
