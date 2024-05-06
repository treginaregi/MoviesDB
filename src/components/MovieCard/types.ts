export interface IMovieCard {
    title: string;
    genreId: number;
    movieId: number;
    voteAverage: number;
    posterPath: string;
}

export interface IGenre {
    id: number;
    name: string;
}

export interface IMovieResponse {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}