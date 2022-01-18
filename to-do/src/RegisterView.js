import styled from "styled-components";
import { useState } from "react";
import { mongoRegister } from "./helpers/contactMongo";
import { StyledButton, StyledLoginWrapper, StyledForm, StyledFormRow, StyledFormTitle, StyledTextInput } from "./components/StyledLoginRegister/LoginRegister";
import { Navigate } from "react-router";

export const RegisterView = ({loggedIn}) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            login: login, 
            password: password
            });
        mongoRegister({
            login: login, 
            password: password
            });
        
    }

    return ( 
      <StyledLoginWrapper>
          { loggedIn && <Navigate replace to="/notes" /> }
          
          <StyledForm onSubmit={e => handleSubmit(e)}>
              <StyledFormTitle>REGISTER</StyledFormTitle>
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
