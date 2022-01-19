import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { mongoLogout } from "../../helpers/contactMongo";
import { PALLETE, DARK_PALLETE } from "../../colors/PALLETE";
import { StyledButton } from "../StyledLoginRegister/LoginRegister";
import { LoginContext, ThemeContext } from "../../App";
import { useContext } from "react";

const StyledNavbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    height: 7rem;
    font-size: 0.8rem;
    background: ${props => props.darkTheme ? DARK_PALLETE.lightBg : PALLETE.lightBg };
    box-shadow: 5px 0 8px -3px black;
`

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: ${PALLETE.menuOptions};
    padding: 1rem;
    margin: 0 4rem;
    border: 1px solid ${PALLETE.borderGray};
    border-radius: 0.5rem;
    text-transform: uppercase;
    transition: background-color 0.5s, color 0.5s;
    font-weight: 700;
    font-family: inherit;
    font-size: 1.4rem;
    line-height: normal;
    &:hover{
        background: rgba(128, 128, 128, 0.3);
        color: white;
    }
    &.active{
        color: red;
    }
`

const StyledThemeToggle = styled.div`

    --radius: 2.4rem;
    --width: 4rem;

    margin: 0 3rem;
    border-radius: 3rem;
    cursor: pointer;
    width: var(--width);
    height: calc(var(--radius) + 0.1rem);
    background: rgba(128,128,128,0.2);
    position: relative;
    &:after{
        position: absolute;
        left: 0.1rem;
        content: "";
        width: var(--radius);
        height: var(--radius);
        border-radius: var(--radius);
        background: rgba(128,128,128,0.8);
        transform: ${props => props.darkTheme ? "translateX(calc(var(--width) - var(--radius)))" : ""};
        transition: transform 0.5s;
    }
`

const StyledSpacer = styled.div`
    flex-grow: 1;
`

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
