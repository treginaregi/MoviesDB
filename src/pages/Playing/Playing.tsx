import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';  
import { getNowPlaying } from '../../services/movies/getNowPlayingMovies';
import { MovieCard } from '../../components/MovieCard';
import { IMovieResponse } from '../../components/MovieCard/types';

const Playing: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const location = useLocation();

    const getNowPlayingMovies = async () => {
        const data = await getNowPlaying();
        if (data && data.data) {
            setMovies(data.data.results);
            setIsLoading(false);
        } else if (data && data.error) {
            console.error(data.error); 
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getNowPlayingMovies();
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="bg-yellow-500 min-h-screen px-8 py-8 flex flex-col items-center justify-start">
            <img src="/BeanNowPlayingLogo.png" alt="Bean's Now Playing Logo" className="w-96 mb-8" />
            <div className="w-full max-w-screen-2xl mb-8">
                {isLoading ? <div>Loading...</div> : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                title={movie.title}
                                genreId={movie.genre_ids[0]}
                                movieId={movie.id}
                                voteAverage={movie.vote_average}
                                posterPath={movie.poster_path}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Playing;
