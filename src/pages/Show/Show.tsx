import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInfo, getRecommendations } from "../../services";
import { IMovieResponse } from "../../components/MovieCard/types";
import { MovieInformation } from "../../components/MovieInfo";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import { IMovieDetail } from "./types";

const Show: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<IMovieDetail | null>(null);
    const [recommendedMovies, setRecommendationsMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        setIsLoading(true);
        if (id) {
            getInfo(id).then((data) => {
                if (data && data.data) {
                    setMovie(data.data);
                    setIsLoading(false);
                }
            });
            getRecommendations(id).then((data) => {
                if (data && data.data) {
                    setRecommendationsMovies(data.data.results);
                    setIsLoading(false);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [id]);

    return (
        <div className="bg-yellow-500 min-h-screen flex flex-col items-center justify-start px-20 py-8">
            {isLoading && <div>Loading...</div>}
            {movie && (
                <>
                    <div className="w-full max-w-screen-2xl px-8">
                        <div className="flex justify-between items-center p-5">
                            <button onClick={goBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Return
                            </button>
                        </div>
                        <div className="pb-5">
                            <MovieInformation {...movie} />
                        </div>
                    </div>
                    <div className="w-full max-w-screen-2xl px-8 pt-5">
                    <div className="flex items-center">
                            <img src="/BeanRecommended.png" alt="Recommended Icon" className="mr-3 w-16 h-12" />
                            <h1 className="text-3xl font-bold mb-4">Recommended Movies</h1>
                        </div>
                        {recommendedMovies.length > 0 && 
                            <MovieCarousel movies={recommendedMovies} />
                        }
                    </div>
                </>
            )}
        </div>
    );
};

export default Show;
