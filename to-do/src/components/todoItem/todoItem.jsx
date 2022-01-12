import { useState } from "react";
import styled from "styled-components";
import XIcon from '../../icons/Xicon.png'
import Check from '../../icons/Check.png'
import { PALLETE } from "../../colors/PALLETE";


const StyledRemoveButton = styled.img`
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
    padding: 0 0.4rem;
    font-size: 1.2rem;
    border: none;
    width: 100%;
    margin: 0;
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
    margin: 0.8rem;
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

    ${(props) => props.isDone ? ";" : null};
    opacity: ${(props) => props.isDone ? "0.3;" : "1;"};
    transition: opacity 0.5s;

    &:after{
        transform: ${(props) => props.isDone ? "scaleX(1)" : "scaleX(0)"};
        transition: transform 0.8s;
        content: "";
        position: absolute;
        top: 60%;
        left: 0;
        right: 0;
        height: 2px;
        background: gray;
    }

`

const StyledEditText = styled.input`
    border: none;
    font-size: inherit;
    flex-grow: 1;
    height: 100%;

`
const StyledFlexSpace = styled.div`
    flex-grow: 1;
`

export const TodoItem = ({note, index, setNotes, setLeftCounter}) => {

    const [isEdited, setIsEdited] = useState(false);
    const [editedValue, setEditedValue] = useState(note.text);

    const passEditedValue = () => {
        setIsEdited(false);
        setNotes((oldNotes) => {
            oldNotes[index].text = editedValue;
            return oldNotes;
        });
    }

    const onEnterEditHandle  = (e) => {
        if (e.key === "Enter") {
            passEditedValue();
        }
    }

    const onCheckHandle = () => {
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
    
    const deleteCurrentNote = () => {
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



    return (
        <StyledTodoItem>
            <StyledCheckbox 
                type="checkbox" 
                checked={note.isDone}
                onChange={() => onCheckHandle(note, index, setNotes, setLeftCounter)}
            />
            {!isEdited && <StyledTodoText 
                isDone={note.isDone}
                onDoubleClick={() => setIsEdited(true)} >
                {note.text}
            </StyledTodoText> }
            {isEdited && <StyledEditText 
                value={editedValue}
                onChange={(e)=>setEditedValue(e.target.value)}
                onBlur={passEditedValue}
                onKeyPress={onEnterEditHandle}
                onDoubleClick={passEditedValue} /> }
            <StyledFlexSpace/>
            <StyledRemoveButton
                onClick={() => deleteCurrentNote(index, setNotes)}
                src={XIcon}
                alt="Delete" />
    
        </StyledTodoItem> 
    );
}
