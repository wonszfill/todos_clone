import styled from "styled-components";
import { PALLETE } from "../../colors/PALLETE";

export const Footer = () => {
    
    return ( 
        <StyledFooter>
            <StyledFooterLink href="https://www.linkedin.com/in/przemys%C5%82aw-wojszwi%C5%82%C5%82o/">
                <StyledLogo src="https://seeklogo.com/images/L/linkedin-black-icon-logo-ECC426C572-seeklogo.com.png"/>
                Przemysław Wojszwiłło
            </StyledFooterLink>

            <StyledFooterLink href="https://github.com/wonszfill">
                <StyledLogo src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"/>
                wonszfill
            </StyledFooterLink>

            <StyledFooterLink href="https://todomvc.com/examples/vanillajs/#/">
                Based on todo created by Oscar Godson. 
            </StyledFooterLink>

        </StyledFooter>
    );
}

const StyledFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #433;
    color: ${PALLETE.footerFont};
    padding: 1rem;
    font-size:1.4rem;
    flex-wrap: wrap;
`

const StyledFooterLink = styled.a`
    padding: 1rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    margin: 0 4rem;
`

const StyledLogo = styled.img`
    height: 2rem;
    margin: 0 2rem;
`