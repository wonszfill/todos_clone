import styled from "styled-components";
import { useState } from "react";
import { mongoLogin } from "./helpers/contactMongo";
import { Navigate } from "react-router";
import { PALLETE } from "./colors/PALLETE";
import { StyledButton, StyledLoginWrapper, StyledForm, StyledFormRow, StyledFormTitle, StyledTextInput } from "./components/StyledLoginRegister/LoginRegister";

export const LoginView = ({loggedIn, setLoggedIn}) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            login: login, 
            password: password
            });
        mongoLogin({
            login: login, 
            password: password
            })
        .then(res => {
            if (res.status === 200){
                setLoggedIn(true)
            }
        })
    }

    return ( 
    <StyledLoginWrapper>
        { loggedIn && <Navigate replace to="/notes" /> }
        
        <StyledForm onSubmit={e => handleSubmit(e)}>
            <StyledFormTitle>LOGIN</StyledFormTitle>
                <StyledFormRow>
                    <label>
                    Login:
                    <StyledTextInput type="text" value={login} onChange={(e)=>setLogin(e.target.value)} />        
                    </label>
                </StyledFormRow>
                <StyledFormRow>
                    <label>
                    Hasło:
                    <StyledTextInput type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />        
                    </label>
                </StyledFormRow>  
                <StyledFormRow>
                    <StyledButton type="submit" >Wyślij</StyledButton>
                </StyledFormRow>                   
        </StyledForm>
    </StyledLoginWrapper> 
    );
}
