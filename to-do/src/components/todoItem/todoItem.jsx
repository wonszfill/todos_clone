import { useState } from "react";
import styled from "styled-components";
import XIcon from '../../icons/Xicon.png'

const StyledRemoveButton = styled.img`
    width:1rem;
    padding: 0.2rem;
    margin-right: 0.3rem;
    visibility: hidden;
`

const StyledTodoItem = styled.div`
    padding: 0.4rem;
    font-size: 1.2rem;
    border: none;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    border-top: 1px solid rgba(128,128,128,0.3);
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
    margin-right: 0.8rem;
    border-radius: 50%;
    border:1px solid rgba(128,128,128,0.3);
    appearance: none;
    &:checked{
        background: red;
    }
`

const StyledTodoText = styled.span`
    display: block;
    flex-grow: 1;
    text-align: left;
    text-decoration: ${(props) => props.isDone ? " line-through;" : null};
    opacity: ${(props) => props.isDone ? "0.3;" : "1;"};
    transition: opacity 0.5s;
`

const onCheckHandle = (note, index, setNotes, setLeftCounter) => {
    setNotes((oldNotes) => {
        oldNotes[index].isDone = !oldNotes[index].isDone;
        console.log("check", oldNotes[index].isDone, !oldNotes[index].isDone );
        return oldNotes;
    });
    if (note.isDone) {
        setLeftCounter(oldCounter => oldCounter-1);
    }else{
        setLeftCounter(oldCounter => oldCounter+1)
    }    
}

const deleteCurrentNote = (index, setNotes) => {
    setNotes(oldNotes => {
        const firstSlice = oldNotes[0] ? oldNotes.slice(0,index) : null; 
        console.log(firstSlice);
        const secondSlice = oldNotes.slice(index+1);
        console.log(secondSlice);
        const newNotes = [...firstSlice, ...secondSlice];
        console.log(newNotes);
        console.log("_______");
        return newNotes;
    })
}

export const TodoItem = ({note, index, setNotes, setLeftCounter}) => {

    return ( 
    <StyledTodoItem>
        <StyledCheckbox 
            type="checkbox" 
            checked={note.isDone}
            onChange={() => onCheckHandle(note, index, setNotes, setLeftCounter)}
        />
        <StyledTodoText isDone={note.isDone}>
            {note.text}
        </StyledTodoText> 
        <StyledRemoveButton
            onClick={() => deleteCurrentNote(index, setNotes)}
            src={XIcon}
            alt="Delete" />
  
    </StyledTodoItem> 
    );
}
 
