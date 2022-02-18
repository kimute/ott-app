import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Navigation = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    top:0;
    height: 80px;
    font-size: 15px;
    padding: 20px 40px;
    min-width: 630px; 
    z-index: 2;
`;
const Column = styled.div`
 
    display: flex;
    align-items: center;
`;

const Logo = styled(motion.svg)`
    margin-right: 50px;
    width: 100px;
    height: 55px;
    
`;

const Items = styled.ul`
    display:flex;
    align-items: center;
`;

const Item = styled.li`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: 20px;
    color: ${(props) => props.theme.white.lighter};
    transition: color 0.3s ease-in-out;
    &:hover {
    color: ${(props) => props.theme.white.darker};
    }
`;

const Search = styled.form`
    color: #9ddcf7;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    svg {
        height: 25px;
    }
`;

const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 0px;
    padding: 5px 5px;
    padding-left:  40px;;
    z-index: -1;
    color: #9ddcf7;
    outline: none;
    border: none;
    font-size: 16px;
    background-color: transparent;
    border-bottom: 1px solid ${(props) => props.theme.blue};

`;

const svg ={
    start: {
        pathLength: 0, fill: "rgb(255, 255, 255,0)"
    },
    end:{
        fill: "rgb(14, 137, 219)",
        pathlength: 2,
        transition: { duration: 2}
    }
}

const Circle = styled(motion.span)`
    position: absolute;
    width: 8px;
    height: 8px;
    bottom: -15px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${(props) => props.theme.blue};
    border-radius: 5px;
`;

function SearchHeader(){
    const isHome = useRouteMatch("/home");
    const isTv = useRouteMatch("/tv");
    const isMylist = useRouteMatch("/mylist");
    const navAni = useAnimation();
    const { scrollY } = useViewportScroll();
    useEffect(() =>{
        scrollY.onChange(()=>{
            if(scrollY.get() > 90 ){
                navAni.start({
                    backgroundColor: "rgb(2, 29, 41)"
                });
            }else{
                navAni.start({
                    backgroundColor: "rgb(0, 0, 0,0)"
                });
            }
        });
    }, [scrollY, navAni])
   
    return (
        <Navigation 
            animate={navAni}
            initial={{ backgroundColor: "rgb(2, 29, 41)"}}>
            <Column>
                <Link to="/home">
                <Logo
                  variants={svg}
                  initial={"start"}
                  animate={"end"}
                  stroke="rgb(4, 154, 255)"
                  strokeWidth="6"
                  transition={{
                      default: { duration :3},
                      fill:{ duration:1, delay: 2}
                  }}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 640 512">
                <motion.path d="M640 329.3c0 65.9-52.5 114.4-117.5 114.4-165.9 0-196.6-249.7-359.7-249.7-146.9 0-147.1 212.2 5.6 212.2 42.5 0 90.9-17.8 125.3-42.5 5.6-4.1 16.9-16.3 22.8-16.3s10.9 5 10.9 10.9c0 7.8-13.1 19.1-18.7 24.1-40.9 35.6-100.3 61.2-154.7 61.2-83.4 .1-154-59-154-144.9s67.5-149.1 152.8-149.1c185.3 0 222.5 245.9 361.9 245.9 99.9 0 94.8-139.7 3.4-139.7-17.5 0-35 11.6-46.9 11.6-8.4 0-15.9-7.2-15.9-15.6 0-11.6 5.3-23.7 5.3-36.3 0-66.6-50.9-114.7-116.9-114.7-53.1 0-80 36.9-88.8 36.9-6.2 0-11.2-5-11.2-11.2 0-5.6 4.1-10.3 7.8-14.4 25.3-28.8 64.7-43.7 102.8-43.7 79.4 0 139.1 58.4 139.1 137.8 0 6.9-.3 13.7-1.2 20.6 11.9-3.1 24.1-4.7 35.9-4.7 60.7 0 111.9 45.3 111.9 107.2z"/>
                </Logo>
                </Link>
                <Items>
                    <Item>
                        <Link to="/home">
                        Home {isHome?.isExact && <Circle layoutId="point"/>}
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/tv">
                        TV Shows {isTv && <Circle layoutId="point"/>}
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/mylist">
                        My List {isMylist && <Circle layoutId="point"/>}
                        </Link>
                    </Item>
                </Items>
            </Column>
            <Column>
            </Column>
        </Navigation>);
}

export default SearchHeader;