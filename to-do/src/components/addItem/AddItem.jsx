import uniqid from 'uniqid';
import styled from "styled-components";
import { postNoteToJSON } from '../../helpers/contactJSON';

const StyledAddItem = styled.input`
    padding: 1rem 0.4rem;
    box-sizing: border-box;
    font-size: 1.2rem;
    border: none;
    width: 100%;
    margin: 0;
    text-align: left;
    background: white;
    font-weight: inherit;
    font-family: inherit;
    &:active{
        border: none;
    }
    &:focus{
        border: none;
        outline: none;
    }
    &::placeholder {
        font-style: italic;
        opacity: 0.1;
    }

`

export const AddItem = ({setNotes}) => {

    const addNote = (e) => {
        if (e.target.value !== "") {
            const text = e.target.value;
            const isDone = false;
            const newNote = {text: text, isDone: isDone, id: uniqid()}
            const newJSON = {[newNote.id] : {text: text, isDone: isDone}}
            setNotes((oldNotes) => [newNote, ...oldNotes]);
            e.target.value = "";
            postNoteToJSON(newNote);
        }
    }

    const onClickHandle  = (e) => {
        if (e.key === "Enter") {
            addNote(e)
        }
    }

    const onBlurHandle = (e) => {
        addNote(e);
    }

    return (
        <StyledAddItem
            type="text" 
            placeholder="What needs to be done?" 
            onKeyDown={onClickHandle}
            onBlur={onBlurHandle}    
        />
     );
}
 
