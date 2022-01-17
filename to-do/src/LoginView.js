import styled from "styled-components";
import { useState } from "react";
import { mongoLogin } from "./helpers/contactMongo";

const StyledLoginWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    margin-top: 2rem;
    max-width: 30rem;
`

export const LoginView = () => {

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
            });
        
    }

    return ( 
    <StyledLoginWrapper>
        <h1>LOGIN</h1>
        <StyledForm onSubmit={e => handleSubmit(e)}>        
        <label>
          Login:
          <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)} />        
        </label>
        <label>
          Hasło:
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />        
        </label>
        <input type="submit" value="Wyślij" />
      </StyledForm>
    </StyledLoginWrapper> 
    );
}
