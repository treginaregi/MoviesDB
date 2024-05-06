import React from 'react';
import Slider from 'react-slick';
import { MovieCard } from '../MovieCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
}

interface MovieCarouselProps {
    movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
{Array.isArray(movies) && movies.map(movie => (
    <div className='px-6'>
    <MovieCard
        key={movie.id}
        movieId={movie.id}
        posterPath={movie.poster_path}
        title={movie.title}
        voteAverage={movie.vote_average}
        genreId={movie.genre_ids[0]}
        />
    </div>
))}
        </Slider>
    );
};

export default MovieCarousel;