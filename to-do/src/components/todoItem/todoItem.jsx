import { useState } from "react";
import styled from "styled-components";

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

export const TodoItem = ({note, index, setNotes, setLeftCounter}) => {

    return ( 
    <StyledTodoItem>
        <StyledCheckbox 
            type="checkbox" 
            checked={note.isDone}
            onClick={() => onCheckHandle(note, index, setNotes, setLeftCounter)}
        />
        <StyledTodoText isDone={note.isDone}>
            {note.text}
        </StyledTodoText>      
    </StyledTodoItem> 
    );
}
 
