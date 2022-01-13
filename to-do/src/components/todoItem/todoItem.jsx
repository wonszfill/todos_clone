import { useState } from "react";
import styled, { keyframes } from "styled-components";
import XIcon from '../../icons/Xicon.png'
import Check from '../../icons/Check.png'
import { PALLETE } from "../../colors/PALLETE";

import { patchToJSON, deleteFromJSON } from "../../helpers/contactJSON";

const StyledRemoveButton = styled.img`
    position: absolute;
    top: 1rem;
    right: 0.8rem;
    width:1rem;
    padding: 0.2rem;
    margin-right: 0.3rem;
    visibility: hidden;
    opacity: 0.3;
    cursor: pointer;
    &:hover{
        opacity: 0.6;
    }
`

const StyledTodoItem = styled.div`
    padding-left:0.4rem;
    font-size: 1.2rem;
    border: none;
    width: 100%;
    margin: 0;
    position: relative;
    box-sizing: border-box;
    border-top: 1px solid ${PALLETE.borderGray};
    display: flex;
    justify-content: start;
    align-items: center;
    
    &:hover ${StyledRemoveButton} {
        visibility: visible;
    }
`

const StyledCheckbox = styled.input`
    --radius: 2rem;
    width: var(--radius);
    height: var(--radius);
    margin: 0.6rem 0.4rem;
    border-radius: 50%;
    border:1px solid black;
    appearance: none;
    opacity: 0.15;
    &:checked{
        background-image: url(${Check});
        background-size: contain;
    }
`

const StyledTodoText = styled.span`
    position: relative;
    text-align: left;
    opacity: ${(props) => props.isDone ? "0.5;" : "1;"};
    transition: opacity 0.7s;

    &:after{
        transform-origin: 10%;
        transform: ${(props) => props.isDone ? "scaleX(1)" : "scaleX(0)"};
        transition: transform 0.4s ease;
        content: "";
        position: absolute;
        top: 55%;
        left: 0;
        right: 0;
        height: 2px;
        background: rgba(64,64,64,1);
    }

`
const KeyframesPulsatingText = keyframes`
    0% {opacity: 1}
    25% {opacity: 0.6}
    50% {opacity: 0.5}
    75% {opacity: 0.6}
    100% {opacity: 1}
`

const StyledEditText = styled.input`
    font-size: inherit;
    color: inherit;
    flex-grow: 1;
    display: block;
    height: 100%;
    font-family: inherit;
    border: 1px solid ${PALLETE.borderGray};
    padding: 0.8rem 0.4rem;
    &:focus, &:active{
        box-shadow: inset 0 0 5px 1px ${PALLETE.shadowBlack};
        border:none;
        outline: none;
        animation-name: ${KeyframesPulsatingText};
        animation-iteration-count: infinite;
        animation-duration: 1.5s;
    }
`

export const TodoItem = ({note, setNotes, setLeftCounter}) => {

    const [isEdited, setIsEdited] = useState(false);
    const [editedValue, setEditedValue] = useState(note.text);

    const deleteCurrentNote = () => {
        setNotes(oldNotes => {
            const mainIndex = oldNotes.indexOf(note);
            const firstSlice = oldNotes[0] ? oldNotes.slice(0,mainIndex) : null;
            const secondSlice = oldNotes.slice(mainIndex+1);
            const newNotes = [...firstSlice, ...secondSlice];
            deleteFromJSON(note.id);
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
            patchToJSON(note.id, "text", editedValue);
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
            patchToJSON(note.id, "isDone", newIsDone);
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
