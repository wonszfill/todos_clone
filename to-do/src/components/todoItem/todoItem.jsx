import { useState } from "react";
import styled, { keyframes } from "styled-components";
import XIcon from '../../icons/Xicon.png'
import Check from '../../icons/Check.png'
import { PALLETE } from "../../colors/PALLETE";

import { mongoMultipleDelete, mongoPatchOne } from '../../helpers/contactMongo';


export const TodoItem = ({note, setNotes, setLeftCounter}) => {

    const [isEdited, setIsEdited] = useState(false);
    const [editedValue, setEditedValue] = useState(note.text);

    const deleteCurrentNote = () => {
        setNotes(oldNotes => {
            const mainIndex = oldNotes.indexOf(note);
            const firstSlice = oldNotes[0] ? oldNotes.slice(0,mainIndex) : null;
            const secondSlice = oldNotes.slice(mainIndex+1);
            const newNotes = [...firstSlice, ...secondSlice];
            mongoMultipleDelete([note._id]);
            return newNotes;
        })
    }

    const passEditedValue = (e) => {
        setIsEdited(false);
        if (e.target.value !== "") {
            setNotes((oldNotes) => {
                const mainIndex = oldNotes.indexOf(note);
                oldNotes[mainIndex].text = editedValue;
                return oldNotes;
            });
            mongoPatchOne(note._id, "text", editedValue);
        } else {
            deleteCurrentNote();
        }
    }

    const onEnterEditHandle  = (e) => {
        if (e.key === "Enter") {
            passEditedValue();
        }
    }

    const onCheckHandle = () => {
        setNotes((oldNotes) => {
            const mainIndex = oldNotes.indexOf(note);
            const newIsDone = !oldNotes[mainIndex].isDone;
            oldNotes[mainIndex].isDone = newIsDone;
            mongoPatchOne(note._id, "isDone", newIsDone);
            return oldNotes;
        });
        
        if (note.isDone) {
            setLeftCounter(oldCounter => oldCounter-1);
        }else{
            setLeftCounter(oldCounter => oldCounter+1)
        }    
    }

    return (
        <StyledTodoItem>
            <StyledCheckbox 
                type="checkbox" 
                checked={note.isDone}
                onChange={onCheckHandle}
            />
            {!isEdited && <StyledTodoText 
                isDone={note.isDone}
                onDoubleClick={() => setIsEdited(true)} >
                {note.text}
            </StyledTodoText> }
            {isEdited && <StyledEditText 
                autoFocus 
                value={editedValue}
                onChange={(e)=>{
                    setEditedValue(e.target.value);
                }}
                onBlur={passEditedValue}
                onKeyPress={onEnterEditHandle}
                 /> }
            <StyledRemoveButton
                onClick={deleteCurrentNote}
                src={XIcon}
                alt="Delete" />
    
        </StyledTodoItem> 
    );
}


const StyledRemoveButton = styled.img`

    width:2rem;
    padding: 0.4rem;
    margin-right: 0.6rem;
    visibility: hidden;
    opacity: 0.3;
    cursor: pointer;
    &:hover{
        opacity: 0.6;
    }
`

const StyledTodoItem = styled.div`
    padding-left: 0.8rem;
    font-size: 2rem;
    border: none;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0;
    position: relative;
    box-sizing: border-box;
    border-top: 1px solid ${PALLETE.borderGray};
    display: grid;
    grid-template-columns: 6rem auto 6rem;
    justify-items: center;
    align-items: center;
    
    &:hover ${StyledRemoveButton} {
        visibility: visible;
    }
`

const StyledCheckbox = styled.input`
    --radius: 4rem;
    width: var(--radius);
    height: var(--radius);
    margin: 1.2rem 0.8rem;
    border-radius: 50%;
    border: 1px solid black;
    appearance: none;
    opacity: 0.15;
    &:checked{
        background-image: url(${Check});
        background-size: contain;
    }
`

const StyledTodoText = styled.div`
    position: relative;
    text-align: left;
    width: 100%;
    opacity: ${(props) => props.isDone ? "0.5;" : "1;"};
    text-decoration: ${(props) => props.isDone ? "line-through;" : "1;"};
    transition: opacity 0.7s;
    overflow: hidden;
`
const KeyframesPulsatingText = keyframes`
    0% {opacity: 1}
    25% {opacity: 0.6}
    50% {opacity: 0.5}
    75% {opacity: 0.6}
    100% {opacity: 1}
`

const StyledEditText = styled.textarea`
    resize: vertical;
    font-size: inherit;
    width: 100%;
    color: inherit;
    flex-grow: 1;
    display: block;
    line-break: loose;
    height: 100%;
    font-family: inherit;
    border: 1px solid ${PALLETE.borderGray};
    &:focus, &:active{
        box-shadow: inset 0 0 5px 1px ${PALLETE.shadowBlack};
        border:none;
        outline: none;
        animation-name: ${KeyframesPulsatingText};
        animation-iteration-count: infinite;
        animation-duration: 1.5s;
    }
    /* SCROLLBAR */
    scrollbar-width: thin;
    scrollbar-color: ${PALLETE.grey} ;
    &::-webkit-scrollbar {
    width: 12px;
    }
    &::-webkit-scrollbar-track {
    }
    &::-webkit-scrollbar-thumb {
    background-color: ${PALLETE.grey};
    border-radius: 20px;
    border: 3px solid white;
    }
`
