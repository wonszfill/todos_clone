import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { mongoGetAllUsers, mongoSwitchAdmin, mongoAdminGetUserNotes } from "../helpers/contactMongo";
import { PALLETE } from "../colors/PALLETE";
import { Navigate } from "react-router";
import { LoginContext } from "../App";
import { CSSTransition } from "react-transition-group";

export const Admin = () => {

    const [users, setUsers] = useState([]);
    const [outOfSync, setOutOfSync] = useState(true);
    const [currentPreview, setCurrentPreview] = useState(-1);
    const [previewNotes, setPreviewNotes] = useState([]);

    useEffect(() => {
        mongoGetAllUsers()
        .then(data => setUsers(data))
        .then(() => setOutOfSync(false))
    }, [outOfSync])

    const loginContext = useContext(LoginContext);

    const isAllowedAccess = loginContext.loggedIn && loginContext.isAdmin;

    const switchAdmin = (user, index) => {
        mongoSwitchAdmin(user, !user.isAdmin)
        .then(async res => {
            if (!res.ok) {
                return
            }
            const data = await res.json()

            setUsers(users.map((user, mapIndex) => {
                return mapIndex !== index ? user : {...user, isAdmin: !user.isAdmin}
                })
            )
        })
    }

    const handlePreviewNotes = (user, index) => {
        if (index === currentPreview) {
            setCurrentPreview(-1);
            return
        }
        mongoAdminGetUserNotes(user.login)
        .then(res => res.json())
        .then(data => {
            setCurrentPreview(index);
            setPreviewNotes(data);
            console.log(data[0]);
        })
    }

    return ( 
        <StyledPanelWrapper>
            { !isAllowedAccess && <Navigate replace to="/notes/" /> }
            <StyledUserContainer>
            <StyledLabelWrapper>
                <StyledUserLabel>
                        Login:
                    </StyledUserLabel>
                    <StyledUserLabel>
                        isAdmin:
                    </StyledUserLabel>
                    <StyledUserLabel>
                        Posts preview:
                    </StyledUserLabel>
            </StyledLabelWrapper>
            </StyledUserContainer>
            {users && users.map((user, index) => (
                <StyledUserContainer>
                    <StyledUserWrapper key={user.login}>
                            <StyledUserProp>
                                {user.login}
                            </StyledUserProp>
                            <StyledIsAdmin
                                disabled={loginContext.login === user.login}
                                type="checkbox" 
                                checked={user.isAdmin}
                                onChange={(e) => switchAdmin(user, index)}
                            />
                            <StyledPostPreview 
                                type="checkbox"  
                                onClick={() => handlePreviewNotes(user, index)}
                                isCurrent={currentPreview === index}         
                            />
                    </StyledUserWrapper>
                    <CSSTransition
                        in={currentPreview === index}
                        key={index}
                        timeout={900}
                        classNames="notesPreview"
                        unmountOnExit
					>
                    
                        <>
                        {previewNotes[0] ? <StyledUserNotesList>
                            <StyledNotesLabelWrapper>
                                    <StyledUserNoteProp>
                                        No.
                                    </StyledUserNoteProp>
                                    <StyledUserNoteProp>
                                        Note id
                                    </StyledUserNoteProp>
                                    <StyledUserNoteProp>
                                        Note text
                                    </StyledUserNoteProp>
                                    <StyledUserNoteProp>
                                        Is note done?
                                    </StyledUserNoteProp>
                                </StyledNotesLabelWrapper>
                            {previewNotes.map((note, index) => (
                                <StyledUserNotesWrapper>
                                    <StyledUserNoteProp>
                                        {index}
                                    </StyledUserNoteProp>
                                    <StyledUserNoteProp>
                                        {note._id}
                                    </StyledUserNoteProp>
                                    <StyledUserNoteProp>
                                        {note.text}
                                    </StyledUserNoteProp>
                                    <StyledUserNoteProp>
                                        {note.isDone.toString()}
                                    </StyledUserNoteProp>
                                </StyledUserNotesWrapper>
                                )
                            )}
                        
                        </StyledUserNotesList> : <StyledUserNotesList>
                            <StyledNoNotes>
                                No notes to display
                            </StyledNoNotes>
                        </StyledUserNotesList>
                        }
                        </>
                    
                    </CSSTransition>
                </StyledUserContainer>
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
    margin-top: 3rem;
`

const StyledUserContainer = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0.6rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledUserWrapper = styled.div`
    width: 100%;
    background: rgba(256,256,256,0.7);
    border-radius: 0.5rem;
    border: 1px solid ${PALLETE.borderGray};
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    padding: 0.6rem;
    overflow: hidden;
    font-size: 1.6rem;
    transition: background-color 0.3s;
    box-shadow: 1px 1px 5px 0 ${PALLETE.shadowBlack};
    z-index: 1;
    &:hover{
        background: rgba(220,220,220,0.7);
    }
`

const StyledLabelWrapper = styled(StyledUserWrapper)`
    background: transparent;
    border: none;
    box-shadow: none;
    border-bottom: 1px solid ${PALLETE.borderGray};
    border-radius: 0;
    &:hover{
        background: transparent;
    }
`

const StyledPropWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
`

const StyledUserProp = styled.div`
    padding: 1rem;
`

const StyledUserLabel = styled(StyledUserProp)`

`

const StyledIsAdmin = styled.input`
    margin: 0 1rem;
    cursor: pointer;
`

const StyledPostPreview = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1rem;
    background: ${props => props.isCurrent ? " rgba(190,50,50,0.7)" : "black"};
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    transform: ${props => props.isCurrent ? "rotate(0deg)" : "rotate(90deg)"};
    transition: transform 0.5s, background-color 0.5s;
    cursor: pointer;
`

const StyledUserNotesList = styled.div`
    width: 95%;
    background: rgba(256,256,256,0.7); 
    border-radius: 0 0 1rem 1rem;
    box-shadow: 1px 1px 5px -1px ${PALLETE.shadowBlack}
`

const StyledUserNotesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 5fr 2fr;
    padding: 1rem 1rem;
    justify-content: space-between;
    font-size: 1.4rem;
    border-top: 1px solid ${PALLETE.borderGray}
`

const StyledNotesLabelWrapper = styled(StyledUserNotesWrapper)`
    border-top: none;
    font-weight: 600;
`   

const StyledUserNoteProp = styled.div`
    padding: 1rem 2rem;
    margin: 0.4rem;
    flex-grow: 0;
    line-break: anywhere;
`

const StyledNoNotes = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 1rem;
`