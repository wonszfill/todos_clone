import styled from "styled-components";
import { PALLETE } from "../../colors/PALLETE";

export const Footer = () => {
    
    
    return ( 
        <StyledFooter>
            Footer
        </StyledFooter>
    );
}

const StyledFooter = styled.div`
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #322;
    color: ${PALLETE.footerFont};
`