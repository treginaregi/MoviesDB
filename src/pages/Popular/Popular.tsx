import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { getPopular } from "../../services/movies/getPopularMovies";
import { MovieCard } from "../../components/MovieCard";
import { IMovieResponse } from "../../components/MovieCard/types";

const Popular: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const location = useLocation();

    const getPopularMovies = async () => {
        await getPopular().then((data) => {
            if (data && data.data) {
                setMovies(data.data.results);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getPopularMovies();
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="bg-yellow-500 min-h-screen px-8 py-8 flex flex-col items-center justify-start">
            <img src="/BeanPopularLogo.png" alt="Bean's Popular Logo" className="w-96 mb-8" />
            <div className="w-full max-w-screen-2xl mb-8">
                {isLoading && <div>Loading...</div>}
                {!isLoading && movies.length > 0 &&
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
                }
            </div>
        </div>
    );
}

export default Popular;
