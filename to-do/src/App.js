import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router-dom";

  import { TodoView } from "./TodoView";
  import { LoginView } from "./LoginView";
  import { Navbar } from "./components/Navbar/Navbar";

const App = () => {
  	return (
		<BrowserRouter>
		<Navbar />
		<Routes>
		<Route index path="/" element={<TodoView />} />
		<Route path=":view" element={<TodoView />} />
		<Route path="/login" element={<LoginView />} />
		</Routes>
	  </BrowserRouter>
	)
}

export default App;
