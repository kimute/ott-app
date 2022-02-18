import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = "https://api.themoviedb.org/3/";

interface IMovies {
    id: number
    backdrop_path:string
    overview: string
    poster_path: string
    release_date: string
    title: string
    vote_average: string
}
export interface IGetMovie {
    dates: {
        maximum: string
        minimum: string
    };
    page: number,
    results: IMovies[],
    total_pages: number,
    total_results: number,
}

interface ITvs {
    backdrop_path: string,
    first_air_date: string,
    id: number,
    name: string,
    original_name: string,
    overview: string,
    poster_path: string,
    vote_average: number
}

export interface IGetTv {
    results:ITvs[],
    total_pages: number,
    total_results: number,
}

interface ITop {
    backdrop_path: string,
    id: number,
    overview: string,
    release_date: string,
    title: string,
    video: false,
    vote_average: number,
    poster_path: string
}

export interface IGetToprated {
    results: ITop[]
}

interface IRco {
    backdrop_path: string,
    id: number,
    title: string,
    overview: string,
    release_date: string
}

export interface IRcommand {
    results: IRco[]
}

interface IPop{
    backdrop_path: string,
    first_air_date: string,
    id: number
    name: string,
    original_name: string,
    overview: string,
    poster_path: string,
    vote_average: number
}

export interface ITvpop{
    results: IPop[]
}

export interface ITvtop {
    results: IPop[]
}

export interface ISearch {
    id: number
    backdrop_path:string
    overview: string
    poster_path: string
    release_date: string
    title: string
    vote_average: string
    media_type: string
}

export interface IGetSearch {
    page: number,
    results: ISearch[],
    total_pages: number,
    total_results: number,
}

export interface IVideo {
    name: string,
    key: string,
    type: string,
    official: string,
    published_at: string,
    id: string,
}

export interface IGetVideo {
    id: number
    results:IVideo[]
}

export const getMovie = () =>{
    return fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    );
}

export const getVideos = (movieId: number) =>{
    return fetch(`${BASE_URL}movie/${movieId}/videos?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    );
}

export const getMovies = async (movieId: number) => {
    //this.state.data.data
    const {
      data
    } = await axios.get(
        `${BASE_URL}movie/${movieId}/videos?api_key=${API_KEY}`
    );
}

export const SearchMovies =(keyword: string) => {
    return fetch(`${BASE_URL}search/multi?api_key=${API_KEY}&query=${keyword}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
        );
}

export const getToprated = () => {
    return fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    );
}

export const getUpcomming = () => {
    return fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    );
}

export const getRecommend = (movieId: number) => {
    return fetch(`${BASE_URL}movie/${movieId}/recommendations?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    );
}

export const getPopular = () => {
    return fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    );   
}

export const getTvs = () => {
    return fetch(`${BASE_URL}tv/on_the_air?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    );
}

export const getTvVideos = (tvId: number) =>{
    return fetch(`${BASE_URL}tv/${tvId}/videos?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    );
}

export const getTvPopular = () => {
    return fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    );   
}

export const getTvtoprate = () =>{
    return fetch(`${BASE_URL}tv/top_rated?api_key=${API_KEY}`).then(
        (response) => response.json()
    ).catch(
        error => console.error('fetch api error',error)
    ); 

}