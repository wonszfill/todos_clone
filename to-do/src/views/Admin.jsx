import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { mongoGetAllUsers } from "../helpers/contactMongo";
import { PALLETE } from "../colors/PALLETE";
import { Navigate } from "react-router";
import { LoginContext } from "../App";

export const Admin = () => {

    const [users, setUsers] = useState([]);
    const [outOfSync, setOutOfSync] = useState(true);

    useEffect(() => {
        mongoGetAllUsers()
        .then(data => setUsers(data))
        .then(() => setOutOfSync(false))
    }, [outOfSync])

    const loginContext = useContext(LoginContext);

    const isAllowedAccess = loginContext.loggedIn && loginContext.isAdmin;

    return ( 
        <StyledPanelWrapper>
            { !isAllowedAccess && <Navigate replace to="/notes/" /> }
          
            {users && users.map((user) => (
                <StyledUserWrapper key={user.login}>
                    <StyledPropWrapper>
                        <StyledUserLabel>
                            Login:
                        </StyledUserLabel>
                        <StyledUserProp>
                            {user.login}
                        </StyledUserProp>
                    </StyledPropWrapper>
                    <StyledPropWrapper>
                        <StyledUserLabel>
                            is admin?
                        </StyledUserLabel>
                        <StyledIsAdmin type="checkbox" checked={user.isAdmin}>
                            
                        </StyledIsAdmin>
                    </StyledPropWrapper>
                </StyledUserWrapper>
                )
            )} 
        </StyledPanelWrapper>
    );
}

const StyledPanelWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
`

const StyledUserWrapper = styled.div`
    width: 100%;
    background: white;
    border-radius: 0.5rem;
    border: 1px solid ${PALLETE.borderGray};
    display: flex;
    align-items: center;
    margin: 0.3rem 0;
    overflow: hidden;
    justify-content: space-between;
    max-width: 500px;
    font-size: 1.2rem;
    &:hover{
        background: #eee;
    }
`

const StyledPropWrapper = styled.div`
    display: flex;
`

const StyledUserProp = styled.div`
    padding: 1rem;
`

const StyledUserLabel = styled(StyledUserProp)`
    background-color: #ccc;
`

const StyledIsAdmin = styled.input`
    margin: 0 1rem;
`