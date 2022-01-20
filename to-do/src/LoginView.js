import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { mongoLogin } from "./helpers/contactMongo";
import { Navigate } from "react-router";
import { LoginContext } from "./App";
import { StyledLabel,StyledButton, StyledLoginWrapper, StyledForm, StyledFormRow, StyledFormTitle, StyledTextInput } from "./components/StyledLoginRegister/LoginRegister";
import { FailedLoginAlert } from "./components/Alerts/FailedLoginAlert";

export const LoginView = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isAlertOn, setIsAlertOn] = useState(false);

    const loginContext = useContext(LoginContext);

    useEffect(() => {
        if (!isAlertOn) {
            return
        }
        const timer = setTimeout(() => {
            setIsAlertOn(false);
        }, 5000)
        return () => {clearTimeout(timer)}
    }, [isAlertOn])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(login, password)
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
            } else {
                setIsAlertOn(true)
            }
        })
    }

    return ( 
    <StyledLoginWrapper>
        { loginContext.loggedIn && <Navigate replace to="/notes/" /> }
        
        <StyledForm onSubmit={e => handleSubmit(e)}>
            <StyledFormTitle>LOGIN</StyledFormTitle>
                <StyledFormRow>
                    <StyledLabel>
                    Login: 
                    </StyledLabel>
                    <StyledTextInput type="text" value={login} required onChange={(e)=>setLogin(e.target.value)} />        
                   
                </StyledFormRow>
                <StyledFormRow>
                    <StyledLabel>
                    Hasło:
                    </StyledLabel>
                    <StyledTextInput type="password" value={password} required onChange={(e)=>setPassword(e.target.value)} />        
                   
                </StyledFormRow>  
                <StyledFormRow>
                    <StyledButton type="submit" >Wyślij</StyledButton>
                </StyledFormRow>
                <FailedLoginAlert code={1} isOn={isAlertOn} message="Invalid login or password"/>                   
        </StyledForm>
    </StyledLoginWrapper> 
    );
}
