import styled from "styled-components";

const StyledAddItem = styled.input`
    padding: 1rem;
    box-sizing: border-box;
    font-size: 1.2rem;
    border: none;
    width: 100%;
    margin: 0;
    background: white;
    &::placeholder {
        font-style: italic;
        opacity: 0.1;
    }

`

export const AddItem = ({setNotes}) => {

    const onClickHandle  = (e) => {
        if (e.key === "Enter") {
            const text = e.target.value;
            const isDone = false;
            setNotes((oldNotes) => [...oldNotes, {text: text, isDone: isDone}]);
            e.target.value = "";
        }
    }

    return ( 
        <StyledAddItem
            type="text" 
            placeholder="What needs to be done?" 
            onKeyDown={onClickHandle}>
        </StyledAddItem>
     );
}
 
