import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router-dom";

	import { TodoView } from "./TodoView";
	import { LoginView } from "./LoginView";
	import { Navbar } from "./components/Navbar/Navbar";
	import { useEffect, useState } from "react";
	import { mongoCheckLogin } from "./helpers/contactMongo";
	import { RegisterView } from "./RegisterView";
import styled from "styled-components";

const App = () => {

	const [loggedIn, setLoggedIn] = useState(false);

 	useEffect(() => {
		mongoCheckLogin()
		.then(res => res.status)
		.then(status => {
			if (status !== 200) {
				setLoggedIn(false)
			}
		})
		
	}) 


	const StyledPageWrapper = styled.div`
		min-height: 99vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	`

  	return (
		<StyledPageWrapper>
			<BrowserRouter>
				<Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
				<Routes>
					<Route index path="/notes/" element={<TodoView loggedIn={loggedIn}/>} />
					<Route path="/notes/:view" element={<TodoView loggedIn={loggedIn}/>} />
					<Route path="/login" element={<LoginView loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
					<Route path="/register" element={<RegisterView loggedIn={loggedIn}/>} />
				</Routes>
				<div>footer</div>
			</BrowserRouter>
		</StyledPageWrapper>
	)
}

export default App;
