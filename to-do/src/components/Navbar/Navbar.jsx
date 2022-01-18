import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { mongoLogout } from "../../helpers/contactMongo";
import { PALLETE } from "../../colors/PALLETE";

const StyledNavbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    height: 4rem;
    font-size: 0.8rem;
    background: white;
    box-shadow: 5px 0 8px -3px black;
`

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: ${PALLETE.menuOptions};
    padding: 0.5rem 1rem;
    margin: 0 2rem;
    border: 1px solid ${PALLETE.borderGray};
    border-radius: 0.5rem;
    text-transform: uppercase;
    transition: background-color 0.5s, color 0.5s;
    font-weight: 700;
    &:hover{
        background: #ddd;
        color: white;
    }
    &.active{
        color: red;
    }
`

const StyledSpacer = styled.div`
    flex-grow: 1;
`

export const Navbar = ({loggedIn, setLoggedIn}) => {

    const handleLogout = () => {
        mongoLogout();
        setLoggedIn(false);
    }

    return ( 
    <StyledNavbar>
        <StyledNavLink to='/notes/'> notes </StyledNavLink>
        <StyledSpacer />
        { !loggedIn && <StyledNavLink to="/login"> login </StyledNavLink>
        }
        
        { loggedIn && <StyledNavLink to="/notes/" onClick={handleLogout}>
            logout
        </StyledNavLink>
        }
        { !loggedIn && <StyledNavLink to='/register'> register </StyledNavLink>
        }
             
    </StyledNavbar>
    );
}
