import { motion, useMotionValue, useTransform } from "framer-motion";
import { useHistory} from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Roll = styled(motion.div)`
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
    cursor: pointer;
    &:hover{
        background-color: ${props => props.theme.blue};
        color: black;
        border:none;
    }
`;
const Title = styled.h3`
    font-size: 30px;
`;
const SecondTitle = styled.h3`
    margin-top: 10px;
    margin-left: 15px;
    font-size: 17px;
`;

function Intro(){
    const x = useMotionValue(0);
    const history = useHistory();
    const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
    const goHomeClick = () => history.push("/home");
    const gradient = useTransform(
    x, [-800,0 ,800], 
    [
      'linear-gradient(135deg, rgb(0, 210 ,248), rgb(0, 83 ,238))',
      'linear-gradient(135deg, rgb(0, 183 ,153), rgb(0, 210 ,238))',
      'linear-gradient(135deg, rgb(0, 238 ,155), rgb(238, 178 ,0))',
    ])
  
    return(
        <>
        <Wrapper style={{background: gradient}}>
        <Roll 
              onClick={goHomeClick }
              style={{x, rotateZ}} 
              initial={{x: -800}} 
              animate={{ x:0, transition: {duration: 1.5}}}
              drag="x" dragSnapToOrigin>
         
                <Title>Movie</Title>
                <SecondTitle>&More..?</SecondTitle>
            
              
            </Roll>
        </Wrapper>
        </>
        
);
}
export default Intro;