import React, { useState, useEffect } from 'react';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import { Pill } from '../Pill';
import { IMovieDetail } from '../../pages/Show/types';

const MovieInfo: React.FC<IMovieDetail> = ({
    id,
  poster_path,
  original_title,
  overview,
  budget,
  runtime,
  release_date,
  vote_average,
  vote_count,
  genres: genres_ids,
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]') as (string | number)[];
        const stringFavs = favs.map(fav => String(fav)); 
        setFavorites(stringFavs);
        setIsFavorite(stringFavs.includes(String(id)));
    }, [id]);

    const addFavorite = () => {
        const stringId = String(id);
        if (!favorites.includes(stringId)) {
            const newFavorites = [...favorites, stringId];
            setFavorites(newFavorites);
            setIsFavorite(true);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
    };

    const removeFavorite = () => {
        const stringId = String(id);
        if (favorites.includes(stringId)) {
            const newFavorites = favorites.filter(favId => favId !== stringId);
            setFavorites(newFavorites);
            setIsFavorite(false);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
    };

    const getVoteColor = (vote: number): string => {
        if (vote < 5) return 'red';
        if (vote >= 5 && vote <= 7) return 'orange';
        return 'green';
    };

    const formatBudget = (amount: number): string => {
        if (amount >= 1e6) {
            return `$${(amount / 1e6).toFixed(1)} M`;
        } else if (amount >= 1e3) {
            return `$${(amount / 1e3).toFixed(1)} K`;
        }
        return `${amount} USD`;
    };
    
  return (
    <div className="flex flex-col bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] py-12 px-10 w-full max-w-5xl rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
        <div className="flex flex-grow items-center gap-10 max-sm:flex-col">
            <img src={IMAGE_SOURCE + poster_path} alt="Descripción de la imagen" className="w-80 shrink-0 rounded" />
            <div>
            <div className="flex items-center">
                            <img src="/BeanTitle.png" alt="Title Icon" className="mr-3 w-16 h-12 mb-4" />
                            <h3 className="text-3xl font-bold mb-4">{original_title}</h3>
                        </div>
                <p className="text-justify mt-2 text-sm text-gray-400">{overview}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 text-lg justify-items-start">
                    <span className="flex items-center justify-star">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white shrink-0" viewBox="0 0 24 24">
                        <path d="M21,6H3C1.9,6,1,6.9,1,8v8c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V8C23,6.9,22.1,6,21,6z M12,15c-1.66,0-3-1.34-3-3s1.34-3,3-3s3,1.34,3,3S13.66,15,12,15z"/>
                        </svg><p className="pl-1 text-sm">{formatBudget(budget)}</p>
                    </span>
                    <span className="flex items-center justify-start">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                        </svg><p className="pl-1 text-sm">{runtime} min.</p>
                    </span>
                    <span className="flex items-center justify-start">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clip-rule="evenodd"/>
                        </svg><p className="pl-1 text-sm">{release_date.split('-').join('.')}</p>
                    </span>
                    <span className="flex items-center justify-start">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                        </svg><p className="pl-1 text-sm">{vote_average}</p>
                    </span>
                    <span className="flex items-center justify-start">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-1 9a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm2-5a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3Z" clip-rule="evenodd"/>
                        </svg><p className="pl-1 text-sm">{vote_count}</p>
                    </span>
                </div>
                    <div className="flex flex-row flex-wrap gap-2 my-4 justify-start ml-4">
                        {genres_ids?.map((genre, index) => (
                            <Pill key={index} title={genre.name} color={getVoteColor(vote_average)} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-16">
                        {isFavorite ? (
                            <button onClick={removeFavorite} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
                            <img src="/BeanAddFavorite.png" alt="Remove from Favorites" className="mr-2 w-8 h-8" />   
                                Remove from Favorites
                            </button>
                        ) : (
                            <button onClick={addFavorite} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
                            <img src="/BeanAddFavorite.png" alt="Add to Favorites" className="mr-2 w-8 h-8" />     
                                Add to Favorites
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
  );
};

export default MovieInfo;