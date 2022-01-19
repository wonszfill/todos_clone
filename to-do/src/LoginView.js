import styled from "styled-components";
import { useState, useContext } from "react";
import { mongoLogin } from "./helpers/contactMongo";
import { Navigate } from "react-router";
import { LoginContext } from "./App";
import { StyledButton, StyledLoginWrapper, StyledForm, StyledFormRow, StyledFormTitle, StyledTextInput } from "./components/StyledLoginRegister/LoginRegister";

export const LoginView = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const loginContext = useContext(LoginContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        mongoLogin({
            login: login, 
            password: password
            })
        .then(res => {
            if (res.status === 200){
                loginContext.setLoggedIn(true);
                const data = res.json();
                if (data.isAdmin) {
                    loginContext.setIsAdmin(true)
                }
            }
        })
    }

    return ( 
    <StyledLoginWrapper>
        { loginContext.loggedIn && <Navigate replace to="/notes/" /> }
        
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
