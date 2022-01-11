import styled from "styled-components";



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
        <input placeholder="What needs to be done?" onKeyDown={onClickHandle}>
        </input>
     );
}
 
