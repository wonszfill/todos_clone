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
	import { Admin } from "./views/Admin";

const App = () => {

	const [loggedIn, setLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false)

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
		min-height: 99vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	`

  	return (
		<StyledPageWrapper>
			<BrowserRouter>
				<Navbar 
					loggedIn={loggedIn} 
					setLoggedIn={setLoggedIn} 
					setIsAdmin={setIsAdmin} 
					isAdmin={isAdmin} 
				/>
				<Routes>
					<Route index path="/notes/" element={<TodoView loggedIn={loggedIn}/>} />
					<Route path="/notes/:view" element={<TodoView loggedIn={loggedIn}/>} />
					<Route path="/login" element={<LoginView loggedIn={loggedIn} setIsAdmin={setIsAdmin}  setLoggedIn={setLoggedIn} />} />
					<Route path="/register" element={<RegisterView loggedIn={loggedIn}/>} />
					<Route path="/admin" element={<Admin loggedIn={loggedIn} isAdmin={isAdmin} />} />
				</Routes>
				<div>footer</div>
			</BrowserRouter>
		</StyledPageWrapper>
	)
}

export default App;
