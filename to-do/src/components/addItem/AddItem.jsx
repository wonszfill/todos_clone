import uniqid from 'uniqid';
import styled from "styled-components";
import { mongoPostNewNote } from '../../helpers/contactMongo';

export const AddItem = ({setNotes, setIsSync}) => {

    const addNote = (e) => {
        if (e.target.value !== "") {
            const text = e.target.value;
            const isDone = false;
            const createdTime = Date.now();
            const newNote = {
                text: text, 
                isDone: isDone,
                _id: uniqid("note-"),
                created: createdTime
            }
            mongoPostNewNote(newNote)
            .then(res => {
                if (res.status !== 200) {
                    return
                }
                setNotes((oldNotes) => [newNote, ...oldNotes]);
            })
            e.target.value = "";
            
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
 
const StyledAddItem = styled.input`
    padding: 2rem 0.8rem;
    box-sizing: border-box;
    font-size: 2rem;
    border: none;
    width: 100%;
    margin: 0;
    text-align: left;
    background: transparent;
    font-weight: inherit;
    font-family: inherit;
    color: inherit;
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