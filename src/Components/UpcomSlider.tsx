import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getUpcomming, getVideos, IGetMovie} from "../api";
import {imagePath} from "../utils";

const Wrapper = styled.div`
margin-top:270px;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MiniTitle = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
`;

const Slider = styled.div`
    position: relative;
    top: -100px;
`;

const SliderRow = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
`;

const Movie = styled(motion.div)<{ bgimage: string}>`
    background-color: rgb(255, 255, 255);
    background-image: url(${(props) => props.bgimage});
    background-size: cover;
    background-position: center center;
    height: 200px;
    color: ${(props) => props.theme.white.lighter};
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    } 
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.midium};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 16px;
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

const InfoMovieCover = styled(motion.div)`
    padding: 0px;
    height: 500px;
    width: 100%;
    margin: 0;
    background-color: cover;
    background-position: center center center;
    background-repeat: no-repeat;
    background-size: contain;
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
    transition: 0.2s;
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

const sliderRowVars = {
    hidden: {
        x: window.outerWidth + 5,
    },
    visible: {
        x:0
    },
    exit: {
        x: -window.outerWidth - 5,
    }
}

const Btn = styled(motion.div)`
    position: absolute;
    top: 18px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 210px;
    background-color: rgba(0, 0, 0, 0.4);
    transition: 0.2s linear;
    cursor: pointer;
    svg{
        fill: #aca5a5;
        width: 30px;
    }
    &:hover{
        svg {
            fill: ${(props) => props.theme.white.lighter};
        }
        background-color: rgba(0, 0, 0, 0);
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

const movieVariants = {
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

const infoVariants = {
    hover:{
        opacity: 1
    }
};

const offset = 6;
function UpcomSlider(){
    const history = useHistory()
    const { scrollY } = useViewportScroll();
    const routeMovieMatch = useRouteMatch<{movieId: string}>("/home/movies/upcomming/:movieId");
    const { data, isLoading } = useQuery<IGetMovie>(["movie", "upcomming"], getUpcomming);
    const [index, setIndex] = useState(0);
    const [Mylist, setAMylist] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [ videoId, setVideoId ] = useState("");
    const indexIncreate = () => {
        if(data) {
            if(leaving)return;
            leavingToggle()
            const totalReults = data?.results.length - 1;
            const lastIndex = Math.floor
            (totalReults / offset) -1 ;
            setIndex((prev) => ( prev === lastIndex ? 0 : prev +1));
        }
    };
    const leavingToggle = () => setLeaving((prev) =>!prev);
    const onMovieClick = (movieId: number) =>{
        history.push(`/home/movies/upcomming/${movieId}`);
        getVideos(movieId).then(v => {
            setVideoId(v["results"][0].key);
        });
        let old = localStorage.getItem("mylist")
        old = JSON.parse(old || "[]");
        if (old?.includes(movieId+"")){
            setAMylist(true);
        }else{
            setAMylist(false);
        }
    };
    const goBackClick = () => history.push("/home");

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
                console.log("remove",id+"")
                console.log(old?.includes(id+""))
                console.log("arryold", Object.entries(old))
                const oldIds:Array <string> = [];
                Object.entries(old).map(m => oldIds.push(m[1]));
                console.log("oldIds",oldIds);
                console.log(id+"")
                oldIds.filter(m=> m !== (id+""));
                console.log("ols", oldIds.filter(m=> m !== (id+"")));
                let result = oldIds.filter(m=> m !== (id+""))
                localStorage.setItem("mylist",JSON.stringify(result)); 
            }

        }
    }
    const clickedItem = routeMovieMatch?.params.movieId && data?.results.find(
        movie => String(movie.id) === routeMovieMatch.params.movieId);

    console.log("clicked item", clickedItem, routeMovieMatch)
    return (
        <Wrapper>
            {isLoading ? 
                (<Loader>Loading</Loader>) : 
                (<>
                    <Slider>
                    <Btn onClick={indexIncreate}>
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M77.25 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C175.6 444.9 183.8 448 192 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L77.25 256zM269.3 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C367.6 444.9 375.8 448 384 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L269.3 256z"/></motion.svg>
                    </Btn>
                    <MiniTitle>Upcoming {'>'} </MiniTitle>
                        <AnimatePresence initial={false} onExitComplete={leavingToggle}> 
                            <SliderRow
                                variants={sliderRowVars}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{type: "tween", duration: 1}}
                                key={index}>
                                {data?.results.slice(1).slice(index*offset, offset*index + offset)
                                .map((i) =>(
                                    <Movie
                                        layoutId={i.id + "top"}
                                        key={i.id}
                                        onClick={()=>onMovieClick(i.id)}
                                        whileHover="hover"
                                        initial="nomal"
                                        variants={movieVariants}
                                        transition={{type:"tween"}}
                                        bgimage={imagePath(i.poster_path, "w500")}>
                                            <Info
                                                variants={infoVariants}>
                                                    <h4>{i.title}</h4>
                                            </Info>
                                    </Movie>))} 
                                    
                            </SliderRow>   
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        { routeMovieMatch ? (
                        <>
                        <Overlay onClick={goBackClick} exit={{opacity: 0}} animate={{opacity: 1}}/>
                       
                        <InfoMovie
                            style={{ top: scrollY.get() + 100}}
                            layoutId={routeMovieMatch.params.movieId}>
                            <motion.svg
                                onClick={goBackClick}
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512">
                                <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
                            </motion.svg>
                            
                            {clickedItem && (
                                <>
                                    <InfoMovieCover style={{
                                        backgroundImage: ` linear-gradient(to top, black, transparent),
                                            url( ${imagePath(clickedItem.backdrop_path, "w500")})`}} />
                                    
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
                                            url={`https://www.youtube.com/watch?v=${videoId}`}
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
    );
}

export default UpcomSlider;
