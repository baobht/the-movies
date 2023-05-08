export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IDates {
  maximum: string;
  minimum: string;
}

export interface IMoviesResponse extends IMoviesResponseError {
  dates?: IDates;
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IMoviesResponseError {
  status_code: number;
  status_message: string;
  success: boolean;
}
