import React , { useEffect, useState }  from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg"

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=e665e55f';

export default function App() {
    const [movies , setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMoive = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMoive('Batman');
    }, [])

    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="seach"
                    onClick={() => searchMoive(searchTerm)}
                />    
            </div>

            {
                movies?.length > 0 
                ? (
                    <div className="container">
                        {movies.map((movie)=> (
                            <MovieCard movie1={movie}/>
                        ))}
                    </div>

                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    )
}
