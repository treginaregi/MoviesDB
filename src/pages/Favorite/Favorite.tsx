import React, { useEffect, useState } from "react";
import { IMovieDetail } from "../Show/types";
import { MovieCard } from "../../components/MovieCard";
import { AxiosResponse } from 'axios';
import { getInfo } from "../../services";
import { useNavigate } from 'react-router-dom';

const Favorite = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [show, setShow] = useState<IMovieDetail[]>([]);
    const favorites: string = localStorage.getItem('favorites') || '';
    const navigate = useNavigate();

    const runGetFavorite = async () => {
        if(favorites.length > 0){
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favorites:string) => {
                    return getInfo(String(favorites))
                    .then((res: AxiosResponse) => res.data)
                    .catch((err: Error) => console.log(err));
                })
            );
            setShow(newShows);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        runGetFavorite();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className="bg-yellow-500 min-h-screen flex flex-col items-center justify-start px-20 py-8">
                <img src="/BeanFavoritesLogo.png" alt="Bean's Favorites Logo" className="w-96 mb-8" />
            {!loading ? (
                show.length > 0 ? (
                    <div className="w-full max-w-screen-2xl px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                            {show.map((movie: IMovieDetail) => (
                                <MovieCard key={movie.id}
                                    movieId={movie.id}
                                    title={movie.title}
                                    genreId={movie.genres[0].id}
                                    voteAverage={movie.vote_average}
                                    posterPath={movie.poster_path}/>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">You don't have favorite movies!</h1>
                        <img src="/BeanNoFavorites.png" alt="No Favorites" className="mx-auto w-96 mb-8" />
                        <p className="mb-4 text-lg">Explore Bean's Star Movies to save your favorites!</p>
                        <button onClick={() => navigate('/')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Explore movies
                        </button>
                    </div>
                )
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Favorite;
