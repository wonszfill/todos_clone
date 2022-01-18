import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { mongoLogout } from "../../helpers/contactMongo";

const StyledNavbar =styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 3rem;
    font-size:1.4rem;
`

export const Navbar = () => {
    return ( 
    <StyledNavbar>
        <NavLink to="/login"> login </NavLink>
        <a onClick={mongoLogout}> logout </a>
        <NavLink to='/notes'> notes </NavLink>    
    </StyledNavbar>
    );
}
