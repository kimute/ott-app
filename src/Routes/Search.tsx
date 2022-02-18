import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import React, { useState } from 'react';
import ReactPlayer from 'react-player'
import { useQuery } from "react-query";
import { SearchMovies, IGetSearch, getVideos } from '../api';
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { imagePath } from "../utils";


const Wrapper = styled.div`
    height: 30vh;

`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchSlider = styled.div`
    top: 150px;
    position: relative;
`;

const SearchRow = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2,1fr);
    width: 100%;
    position: absolute;
    gap: 5px;
    margin-bottom: 5px;
`;

const SearchBox = styled(motion.div)<{ bgimage: string}>`
    height: 250px;
    background-color: black;
    background-size: cover;
    background-position: center center;
    background-image: url(${(props) => props.bgimage});
    border-radius: 5px;
    cursor: pointer;
    color: ${(props) => props.theme.white.lighter};
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    } 
    
`;

const Btn = styled(motion.div)`
    top:  90px;
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    background-color: #07000001;
    cursor: pointer;
    svg{
        width: 30px;
        transition: 0.2s linear;
        fill: #646262;
    }
    &:hover {
        svg{
            fill:${(props) => props.theme.white.lighter};
        } 
    }
`;

const InfoMovie = styled(motion.div)`
    position: absolute; 
    width: 800px; 
    height: 700px;
    background-color: black;
    left: 0;
    right:0;
    margin: 0 auto;
    z-index: 1;
    border-radius: 15px;
    overflow: hidden;
    max-width: 560px;
    svg{
        fill: #faf6f6;
        margin-top: 10px;
        margin-left: 32rem;
        width: 35px;
        transition: 0.2s;
        position: absolute;
        cursor: pointer;
        &:hover {
            fill: ${(props) => props.theme.white.lighter};
        }
    }
`;

const InfoMovieCover = styled.div`
    padding: 0px;
    height: 500px;
    width: 100%;
    margin: 0;
    background-color: cover;
    background-position: center center;
    //background-repeat: no-repeat;
    //background-size: contain;
    
`;

const InfoMovieTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    font-size: 28px;
    position: relative;
    top: -230px;
    padding: 0px 10px;
    bottom: 10px;
    width: 100%;
`;
const InfoMovieDetail = styled.div`
    margin-top: 13px;
    display: flex;
    font-size: 13px;
    gap: 10px;
    font-weight: bolder;
    color: ${(props) => props.theme.white.darker};
    span{
        margin-left: 170px;
        display: none;
    }
    cursor: pointer;
    &:hover{
        span{
            display: block;
        }
    }
`;

const InfoMovieAdd = styled.div`
    width: 200px;
    position: absolute;
    svg {
        margin-top: -30px;
        width: 30px;
    }
    &:hover{
        svg {
            fill:  ${(props) => props.theme.white.darker};;
        }
        
    }
        
`;

const InfoMovieOverView = styled.p`
    top:10px;
    font-size: 13px;
    position: relative;
    
`;

const PlayerWrapper = styled.div`
    top: -220px;
    position: relative;
    height: 300px;
    react-player{
        position: absolute;
        top:0;
        left: 0;
    }
`;

const Overlay = styled(motion.div)`
    position: fixed;
    z-index: 1;
    top:0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;

`;

const ResultTitle = styled.h3`
    margin-bottom: 10px;;
`;

const gridVariants ={
    hidden:{
        y: window.outerHeight
    },
    visible:{
        y:0
    },
    exit:{
        y:-window.outerHeight
    }
};

const SearchVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.2,
            type: "tween"
        }
    }
};

const offset = 5;

function Search(){
    const location = useLocation();
    const history = useHistory();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const { data, isLoading } = useQuery<IGetSearch>(["search","multi"], ()=>SearchMovies(keyword || ''));
    const [index , setIndex] = useState(0);
    const [count, setCount] = useState(1);
    const [leaving, setLeaving] = useState(false);
    const routeMovieMatch = useRouteMatch<{movieId: string}>("/search/:movieId");
    const { scrollY } = useViewportScroll();
    const leavingToggle = () => setLeaving((prev) =>!prev);
    const [Mylist, setAMylist] = useState(false);

    const addMylist = (id:number)=> {
        
        let old = localStorage.getItem("mylist")
        old = JSON.parse(old || "[]");
        if (old?.includes(id+"")){
            setAMylist(true);
           
        }else{
            setAMylist(false);
            let data =[];
            data.push(id+"")
            localStorage.setItem("mylist",JSON.stringify(old?.concat(data+"")));  
        }
        
        if (Mylist === true){ 
            
            let old = localStorage.getItem("mylist")
            old = JSON.parse(old || "[]");
            if(old?.includes(id+"")){
                setAMylist(false);
                const oldIds:Array <string> = [];
                Object.entries(old).map(m => oldIds.push(m[1]));
               let result = oldIds.filter(m=> m !== (id+""))
                localStorage.setItem("mylist",JSON.stringify(result));
            }
        }
    }
    const increaseIndex = () => {
        if(data){
            if(leaving)return;
            leavingToggle();
            const totalReults = data?.results.length;
            const lastIndex = Math.floor
            (totalReults / offset) ;
            setIndex((prev) => ( prev === lastIndex ? 0 : prev +1))
            setCount((count) =>(count === 20 ? 20 : count +1));
        }
    };
    const toggleClick = () => setLeaving((prev) => !prev);
    const [ videoId, setVideoId ] = useState("");
    
    const onMovieClick = (movieId: number) =>{
        history.push(`/search/${movieId}`)
        getVideos(movieId).then(v => {
            setVideoId(  v["results"][0].key)
        });
        let old = localStorage.getItem("mylist")
        old = JSON.parse(old || "[]");
        if (old?.includes(movieId+"")){
            setAMylist(true);
        }else{
            setAMylist(false);
        }
    };
    const clickedItem = routeMovieMatch?.params.movieId && data?.results.find(
        movie => String(movie.id) === routeMovieMatch.params.movieId);

    const goBackClick = (movieId: string) => history.push("/search/");

    return (
        <Wrapper>
            {isLoading ? 
            (<Loader>Loading</Loader>):(
                <>
                <Btn onClick={increaseIndex}>
                   
                <svg 
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M54.63 246.6L192 109.3l137.4 137.4C335.6 252.9 343.8 256 352 256s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25l-160-160c-12.5-12.5-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25S42.13 259.1 54.63 246.6zM214.6 233.4c-12.5-12.5-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0L192 301.3l137.4 137.4C335.6 444.9 343.8 448 352 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L214.6 233.4z"/></svg>
                </Btn>
                
                <SearchSlider>
                <ResultTitle>Search Result ▶︎ {count}/{data?.results.length}</ResultTitle>
                <AnimatePresence initial={false} onExitComplete={toggleClick}>
                    <SearchRow
                        variants={gridVariants} 
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{
                            type:"tween",
                            duration:1
                        }}
                        key={index}>
                      {data?.results.slice(offset*index, offset*index+offset).map((i) =>(<SearchBox 
                        key={i.id}
                        whileHover="hover"
                        initial="nomal"
                        onClick={()=>onMovieClick(i.id)}
                        variants={SearchVariants}
                        bgimage={imagePath(i.backdrop_path, "w500")}
                        >{i.title}</SearchBox>))}
                    </SearchRow>
                 </AnimatePresence>
                </SearchSlider>
                <AnimatePresence>
                        { routeMovieMatch ? (
                        <>
                        <Overlay  exit={{opacity: 0}} animate={{opacity: 1}}/>
                       
                        <InfoMovie
                            style={{ top: scrollY.get() + 100}}
                            layoutId={routeMovieMatch.params.movieId}>
                            <motion.svg
                                onClick={()=>goBackClick(routeMovieMatch.params.movieId)}
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512">
                                <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
                            </motion.svg>

                            {clickedItem && (
                                <>
                                    <InfoMovieCover style={{
                                        backgroundImage: ` linear-gradient(to top, black, transparent),
                                            url( ${imagePath(clickedItem.poster_path)})`}} />
                                    
                                    <InfoMovieTitle>
                                        {clickedItem.title}
                                        <InfoMovieDetail className="detail">
                                            <h3>Release: {clickedItem.release_date}</h3>
                                            <h5>Score: {clickedItem.vote_average}/10</h5>
                                            <span>Add Mylist ▶︎</span> 
                                        </InfoMovieDetail>
                                        <InfoMovieAdd  onClick={()=>addMylist(clickedItem.id)}>
                                            {Mylist? (<motion.svg
                                            layoutId="check" 
                                            xmlns="http://www.w3.org/2000/svg"viewBox="0 0 512 512"><path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
                                        </motion.svg> ):(<motion.svg 
                                           layoutId="check"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/>
                                        </motion.svg>)}
                                    
                                        </InfoMovieAdd>
                                        <InfoMovieOverView>
                                        {clickedItem.overview}
                                        
                                        </InfoMovieOverView>
                                    </InfoMovieTitle>
                                    <PlayerWrapper>
                                        <ReactPlayer 
                                            className='react-player'
                                            url={
                                                `https://www.youtube.com/watch?v=${videoId}`}
                                            playing={true} 
                                            volume={0} 
                                            muted={true}
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </PlayerWrapper>
                                </>)}
                        </InfoMovie>
                        </>
                        ): null}
                    </AnimatePresence>
                
                
        </>)}
        </Wrapper>
    )
}

export default Search;
