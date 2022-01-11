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
    border: 1px solid #ddd;
    appearance: none;
    &:checked{
        background: red;
    }
`

export const TodoItem = ({note, index}) => {
    return ( 
    <StyledTodoItem>
        <StyledCheckbox 
        type="checkbox" 
        // checked={note.isDone}
        />
        {index}
        {note.text}
    </StyledTodoItem> 
    );
}
 
