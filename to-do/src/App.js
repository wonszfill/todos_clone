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
import styled from "styled-components";
import { Admin } from "./views/Admin";
import { Footer } from "./components/Footer/Footer";

export const LoginContext = React.createContext(undefined);

const App = () => {

	const [loggedIn, setLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false)

	const LogContext = {
		loggedIn,
		setLoggedIn,
		isAdmin,
		setIsAdmin
	}

 	useEffect(() => {
		mongoCheckLogin()
		.then(async res => {
			if (res.status !== 200) {
				setLoggedIn(false)
				
			}
			else {
				setLoggedIn(true)
				const data = await res.json();
				console.log(data);
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


	const StyledPageWrapper = styled.div`
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		overflow: hidden;
	`

  	return (
		<LoginContext.Provider value={LogContext}>
			<StyledPageWrapper>
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
	)
}

export default App;
