import styled from "styled-components";
import { PALLETE } from "../../colors/PALLETE";

export const StyledButton = styled.button`
    grid-column: 1 / 3;
    text-decoration: none;
    color: ${PALLETE.menuOptions};
    padding: 1rem 4rem;
    margin: 0 1rem;
    text-transform: uppercase;
    transition: background-color 0.5s, color 0.5s;
    font-weight: 700;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 1.4rem;
    line-height: normal;
    position: relative;
    background: transparent;
    border: none;
    cursor: pointer;
    &:hover{
        background: rgba(128,128,128,0.05)
    }
    &:after{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: transparent;
        border: 1px solid ${PALLETE.borderGray};
        border-radius: 0.5rem;
        opacity: 0;
        transition: opacity 0.4s;
    }
    &:hover:after{
        opacity: 1;
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
    max-width: 30rem;
    position: relative;
`
export const StyledFormTitle = styled.h1`
    margin: 1rem;
    font-size: 1.6rem;
    font-weight: 600;
`

export const StyledFormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 1rem;
    font-size: 1.2rem;
`

export const StyledLabel = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    letter-spacing: 1px;
`

export const StyledTextInput = styled.input`
    border: none;
    border-bottom: 1px solid ${PALLETE.borderGray};
    padding: 1rem;
    margin-left:1rem;
    background: rgba(256, 256, 256, 0.7);
    &:focus{
        outline: none;
        box-shadow: inset 0 0 0 2px ${PALLETE.titleRedish}
    }
`