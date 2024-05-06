import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import { getNowPlaying } from '../../services/movies/getNowPlayingMovies';
import { getTopRated } from '../../services/movies/getTopRatedMovies';
import { getPopular } from '../../services/movies/getPopularMovies';
import { ROUTES } from "../../routes/constants"; 

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

    useEffect(() => {
        getPopular().then(response => {
            setPopularMovies(response.data.results);
        });
        getTopRated().then(response => {
            setTopRatedMovies(response.data.results);
        });
        getNowPlaying().then(response => {
            setNowPlayingMovies(response.data.results);
        });
    }, []);

    return (
        <div className="bg-yellow-500 min-h-screen px-20 py-8">
            <div className="flex flex-col items-center justify-center"> 
                <Link to={ROUTES.HOME}>
                    <img src="/BSM.png" alt="Bean's Star Movies Logo" className="size-fit mb-8" /> 
                </Link>
                <div className="w-full">
                    <Link to={ROUTES.POPULAR} className="flex items-center mb-8">
                        <img src="/BeanPopular.png" alt="Popular Icon" className="mr-3 w-14 h-12" />
                        <h1 className="text-3xl font-bold">Popular</h1>
                    </Link>
                    <div>
                        <MovieCarousel movies={popularMovies} />
                    </div>
                    <Link to={ROUTES.RATED} className="flex items-center my-8">
                        <img src="/BeanTopRated.png" alt="Top Rated Icon" className="mr-3 w-14 h-12" />
                        <h1 className="text-3xl font-bold">Top Rated</h1>
                    </Link>
                    <div>
                        <MovieCarousel movies={topRatedMovies} />
                    </div>
                    <Link to={ROUTES.PLAYING} className="flex items-center my-8">
                        <img src="/BeanNowPlaying.png" alt="Now Playing Icon" className="mr-3 w-14 h-12" />
                        <h1 className="text-3xl font-bold">Now Playing</h1>
                    </Link>
                    <div>
                        <MovieCarousel movies={nowPlayingMovies} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
