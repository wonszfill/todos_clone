import styled from "styled-components";
import { PALLETE } from "../../colors/PALLETE";

export const StyledButton = styled.button`
    text-decoration: none;
    color: ${PALLETE.menuOptions};
    padding: 0.5rem 1rem;
    margin: 0 2rem;
    border: 1px solid ${PALLETE.borderGray};
    border-radius: 0.5rem;
    text-transform: uppercase;
    transition: background-color 0.5s, color 0.5s;
    font-weight: 700;
    background: #fff;
    cursor: pointer;
    &:hover{
        background: #ddd;
        color: white;
    }
`

export const StyledLoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    max-width: 30rem;
`
export const StyledFormTitle = styled.h1`
    margin: 1rem;
    font-size: 1rem;
    font-weight: 600;
`

export const StyledFormRow = styled.div`
    margin: 0.5rem;
`

export const StyledTextInput = styled.input`
    border: none;
    border-bottom: 1px solid ${PALLETE.borderGray};
    padding: 0.4rem;
    margin-left:1rem;
    &:focus{
        outline: none;
        box-shadow: inset 0 0 0 2px ${PALLETE.titleRedish}
    }
`