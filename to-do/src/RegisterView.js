import { useState, useContext } from "react";
import { mongoRegister } from "./helpers/contactMongo";
import { StyledLabel, StyledButton, StyledLoginWrapper, StyledForm, StyledFormRow, StyledFormTitle, StyledTextInput } from "./components/StyledLoginRegister/LoginRegister";
import { Navigate } from "react-router";
import { LoginContext, ThemeContext } from "./App";





export const RegisterView = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState(false);
    const [confPassword, setConfPassword] = useState(false);

    const loginContext = useContext(LoginContext);

    const handleSubmit = (e) => {
        if (confPassword !== password) {return}
        e.preventDefault();
        mongoRegister({
            login: login, 
            password: password
            });
        
    }

    return ( 
      <StyledLoginWrapper>
          { loginContext.loggedIn && <Navigate replace to="/notes/" /> }
          
          <StyledForm onSubmit={e => handleSubmit(e)}>
              <StyledFormTitle>REGISTER</StyledFormTitle>
                  <StyledFormRow>
                      <StyledLabel>
                      Login:
                      </StyledLabel>
                      <StyledTextInput name="login" type="text" value={login} required onChange={(e)=>setLogin(e.target.value)} />        
                      
                  </StyledFormRow>
                  <StyledFormRow>
                      <StyledLabel>
                      Hasło:
                      </StyledLabel>
                      <StyledTextInput name="password" type="password" value={password} required onChange={(e)=>setPassword(e.target.value)} />        
                      
                  </StyledFormRow>
                  <StyledFormRow>
                      <StyledLabel>
                      Potwierdź hasło:
                      </StyledLabel>
                      <StyledTextInput name="confirmed password" type="password" value={confPassword} required onChange={(e)=>setConfPassword(e.target.value)} />        
                      
                  </StyledFormRow>    
                  <StyledFormRow>
                      <StyledButton type="submit" >Wyślij</StyledButton>
                  </StyledFormRow>                   
          </StyledForm>
      </StyledLoginWrapper> 
      );
}
