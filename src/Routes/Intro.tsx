import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    min-width: 630px; 
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Roll = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 200px;
    height: 200px;
    font-size: 25px;
    background-color: black;
    color: ${props => props.theme.white.lighter};
    border-radius: 50px;
    border: 2px solid ${props => props.theme.blue};
    transition: 0.2s linear;
    &:hover{
        background-color: ${props => props.theme.blue};
        color: black;
        border:none;
    }
`;


function Intro(){
    return(
        <>
        <Wrapper>
        <Link to="/home">
            <Roll>
                <span>Movie &</span>
                <span>more</span>
            </Roll>
        </Link>
        </Wrapper>
        </>
        
);
}
export default Intro;