import { useState, useContext } from "react";
import { mongoRegister } from "./helpers/contactMongo";
import { StyledButton, StyledLoginWrapper, StyledForm, StyledFormRow, StyledFormTitle, StyledTextInput } from "./components/StyledLoginRegister/LoginRegister";
import { Navigate } from "react-router";
import { LoginContext } from "./App";
export const RegisterView = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState(false);

    const loginContext = useContext(LoginContext);

    const handleSubmit = (e) => {
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
