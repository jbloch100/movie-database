export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime?: number;

  genres?: {
    id: number;
    name: string;
  }[];

  original_language?: string;

  status?: string;

  vote_count?: number;

  genre_ids?: number[];
};