import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router-dom";
import React from "react";

import { TodoView } from "./TodoView";
import { LoginView } from "./LoginView";
import { Navbar } from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { mongoCheckLogin } from "./helpers/contactMongo";
import { RegisterView } from "./RegisterView";
import styled, { ThemeConsumer } from "styled-components";
import { Admin } from "./views/Admin";
import { Footer } from "./components/Footer/Footer";

export const LoginContext = React.createContext(undefined);
export const ThemeContext = React.createContext(undefined);

const App = () => {

	const [loggedIn, setLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false)
	const [darkTheme, setDarkTheme] = useState(false)
	const [login, setLogin] = useState("");

	const LogContext = {
		loggedIn,
		setLoggedIn,
		isAdmin,
		setIsAdmin,
		login,
		setLogin
	}

	const DarkThemeContext = {
		darkTheme,
		setDarkTheme
	}

 	useEffect(() => {
		mongoCheckLogin()
		.then(async res => {
			if (res.status !== 200) {
				setLoggedIn(false);
				setIsAdmin(false);
			}
			else {
				setLoggedIn(true)
				const data = await res.json();
				setLogin(data.login);
                if (data.isAdmin) {
                    setIsAdmin(true)
                }

			}
		})
		
	})

	useEffect(() => {
		if (!loggedIn){
			setIsAdmin(false)
		}
	}, [loggedIn])

  	return (
		<ThemeContext.Provider value={DarkThemeContext}>
		<LoginContext.Provider value={LogContext}>
			<StyledPageWrapper darkTheme={darkTheme}>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route index path="/notes/" element={<TodoView/>} />
						<Route path="/notes/:view" element={<TodoView/>} />
						<Route path="/login" element={<LoginView/>} />
						<Route path="/register" element={<RegisterView/>} />
						<Route path="/admin" element={<Admin/>} />
					</Routes>
					<Footer/>
				</BrowserRouter>
			</StyledPageWrapper>
		</LoginContext.Provider>
		</ThemeContext.Provider>
	)
}

export default App;

const StyledPageWrapper = styled.div`
	min-height: 100vh;
	display: grid;
	grid-template-rows: auto 1fr auto;
	overflow: hidden;
	background: ${props => props.darkTheme ? "black" :"#f5f5f5"};
	transition: background-color 1s;
`