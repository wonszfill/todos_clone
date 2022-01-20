import styled from "styled-components";
import { PALLETE } from "../../colors/PALLETE";

export const FailedLoginAlert = ({isOn, message}) => {
    return ( 
        <StyledFailedLogin isOn={isOn}>
            {message}
        </StyledFailedLogin>
     );
}
 
const StyledFailedLogin = styled.div`
    position: absolute;
    box-sizing: border-box;
    bottom: calc(100% + 1rem);
    width: 100%;
    padding: 2rem 1rem;
    border-radius: 1rem;

    background: ${PALLETE.alertRed};
    color: #fff;
    font-size: 1.6rem;
    opacity: ${props => props.isOn ? "0.8" : "0" };
    transform: scaleY(${props => props.isOn ? "1" : "0" });
    transition: transform 0.3s, opacity 0.5s;
    box-shadow: 1px 0 5px 1px ${PALLETE.shadowBlack};
    &::after{
        content: "";
        width:2rem;
        height:1rem;
        background: inherit;
        position: absolute;
        top: 100%;
        left: calc(50% - 1rem);
        clip-path: polygon(0 0,50% 100% , 100% 0);
        box-shadow: 1px 0 5px 1px ${PALLETE.shadowBlack};
    }
`