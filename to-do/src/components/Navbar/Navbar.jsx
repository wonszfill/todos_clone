import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { mongoLogout } from "../../helpers/contactMongo";
import { PALLETE, DARK_PALLETE } from "../../colors/PALLETE";
import { LoginContext, ThemeContext } from "../../App";
import { useContext } from "react";



export const Navbar = () => {

    const theme = useContext(ThemeContext)

    const handleLogout = (setLoggedIn) => {
        mongoLogout();
        setLoggedIn(false);
    }

    return (
        <LoginContext.Consumer>
        {value => (
            <StyledNavbar darkTheme={theme.darkTheme}>
                <StyledNavLink to='/notes/'>
                    notes 
                </StyledNavLink>

                <StyledSpacer />

                <StyledThemeToggle 
                    type="checkbox" 
                    darkTheme={theme.darkTheme} 
                    onClick={() => theme.setDarkTheme(prev => !prev)}/>
                
                {!value.loggedIn && <StyledNavLink to="/login">
                    login
                </StyledNavLink>}
                {value.loggedIn && <StyledButton 
                    to="/notes/" 
                    onClick={() => handleLogout(value.setLoggedIn)}>
                    logout
                </StyledButton>}
            
                {!value.loggedIn && <StyledNavLink to='/register'>
                    register
                </StyledNavLink>}
                
                {value.isAdmin && <StyledNavLink to='/admin'> 
                    admin 
                </StyledNavLink>}
                
            </StyledNavbar>
            )
        }
        </LoginContext.Consumer>           
    );
}
const StyledNavbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    height: 7rem;
    font-size: 0.8rem;
    padding: 0 2rem;
    background: ${props => props.darkTheme ? DARK_PALLETE.lightBg : PALLETE.lightBg };
    box-shadow: 0px 0 5px 0px ${PALLETE.shadowBlack};
`

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: ${PALLETE.menuOptions};
    padding: 1rem clamp(1rem, 4vw, 5rem);
    margin: 0 0.5rem;
    text-transform: uppercase;
    transition: background-color 0.5s, color 0.5s;
    font-weight: 700;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: clamp(1.2rem, 2vw, 1.4rem);
    line-height: normal;
    position: relative;

    &:hover{
        background: rgba(128,128,128,0.05)
    }
    &.active{
        color: red;

    }
    &:after{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: transparent;
        border: 1px solid ${PALLETE.borderGray};
        border-radius: 0.5rem;
        opacity: 0;
        transition: opacity 0.4s;
    }
    &:hover:after{
        opacity: 1;
    }
`

const StyledButton = styled.button`
    text-decoration: none;
    color: ${PALLETE.menuOptions};
    padding: 1rem clamp(1rem, 4vw, 5rem);
    margin: 0 0.5rem;
    text-transform: uppercase;
    transition: background-color 0.5s, color 0.5s;
    font-weight: 700;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: clamp(1.2rem, 2vw, 1.4rem);
    line-height: normal;
    position: relative;
    background: transparent;
    border: none;
    cursor: pointer;
    &:hover{
        background: rgba(128,128,128,0.05)
    }
    &:after{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: transparent;
        border: 1px solid ${PALLETE.borderGray};
        border-radius: 0.5rem;
        opacity: 0;
        transition: opacity 0.4s;
    }
    &:hover:after{
        opacity: 1;
    }
`

const StyledThemeToggle = styled.div`

    --radius: 2.4rem;
    --width: 4rem;

    margin: 0 clamp(1rem, 1.5vw, 3rem);
    border-radius: 3rem;
    cursor: pointer;
    width: var(--width);
    height: calc(var(--radius) + 0.1rem);
    background: rgba(128,128,128,0.2);
    position: relative;
    box-shadow: inset 2px 1px 5px 1px ${props => props.darkTheme ? DARK_PALLETE.shadowBlack : PALLETE.shadowBlack};
    &:after{
        position: absolute;
        left: 0.1rem;
        content: "";
        width: var(--radius);
        height: var(--radius);
        border-radius: var(--radius);
        background: ${props => props.darkTheme ? "rgba(85,85,190,0.8)" : "rgba(108,108,210,0.8)"};
        transform: translate(${props => props.darkTheme ? "calc(var(--width) - var(--radius))" : "0px"});
        transition: transform 0.5s;
    }
`

const StyledSpacer = styled.div`
    flex-grow: 1;
`