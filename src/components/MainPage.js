import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/MainPage.css';

import Header from './Header';
import Footer from './Footer';

function MainPage() {
    const [boxOfficeMovies, setBoxOfficeMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const boxOfficeResponse = await axios.get('http://localhost:8080/api/movies/popular');
                setBoxOfficeMovies(boxOfficeResponse.data);

                const recommendedResponse = await axios.get('http://localhost:8080/api/movies/top-rated');
                setRecommendedMovies(recommendedResponse.data);
            } catch (error) {
                console.error('영화 데이터를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="contents">
            <Header />
            <div className="contents-div">
                <div className="box-office">
                    <p className="contents-title">PopularMovies</p>
                    <div className="contents-box">
                        <ul className="contents-ul">
                            {boxOfficeMovies.map((movie) => (
                                <li key={movie.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                    {movie.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 추천 장르 영화 섹션 */}
                <div className="box-recommend">
                    <p className="contents-title">TopRatedMovies</p>
                    <div className="contents-box">
                        <ul className="contents-ul">
                            {recommendedMovies.map((movie) => (
                                <li key={movie.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                    {movie.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
