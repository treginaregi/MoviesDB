import React from 'react';
import { IMovieCard } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import genres from '../../constants/genres.json';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath,
}) => {
    const navigate = useNavigate();
    const poster = IMAGE_SOURCE + posterPath;
    const getGenre = (genreId: number): string => {
        const key = Object.values(genres.genres).find(genre => genre.id === genreId);
        if (key) {
            return key.name;
        }
        return "Not classified";
    };

    const navigateMovies = (id: number, movieName: string) => {
        navigate(`${ROUTES.SHOW}${id}`, {state: { movieName }});
    }

    return (
        <div className=" max-w-xs rounded-lg overflow-hidden shadow-lg relative transition duration-300 ease-in-out"
        onClick={() => {
            navigateMovies(movieId, title);
        }}>
            <div className="group">
            <div className="w-full h-full overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-75" src={poster} alt='poster' />
            </div>
            <div className="absolute bottom-0 left-0 text-white w-full p-4">
                <div className="inline-block bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded">{getGenre(genreId)}</div>
                <div className="font-bold text-xl mb-2">{title}</div>
                <div className="flex items-center mt-1">
                    <svg className="w-4 h-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.11 3.4a1.38 1.38 0 001.31.95h3.585c.944 0 1.336 1.15.643 1.737l-2.898 2.1a1.38 1.38 0 00-.502 1.533l1.11 3.4c.299.922-.758 1.68-1.576 1.16l-2.898-2.1a1.38 1.38 0 00-1.615 0l-2.898 2.1c-.818.52-1.875-.238-1.576-1.16l1.11-3.4a1.38 1.38 0 00-.502-1.533l-2.898-2.1c-.693-.587-.301-1.737.643-1.737h3.585a1.38 1.38 0 001.31-.95l1.11-3.4z" />
                    </svg>
                    <span className="text-sm font-bold text-white ml-1">
                        {voteAverage.toFixed(1)} / 10
                    </span>
                </div>
            </div>
            </div>
        </div>
    );
}

export default MovieCard;
