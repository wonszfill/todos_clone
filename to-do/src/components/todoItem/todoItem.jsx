import styled from "styled-components";

export const TodoItem = ({note, index}) => {
    return ( 
    <div>
        {index}
        {note.isDone}
        {note.text}
    </div> 
    );
}
 
