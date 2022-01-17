import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router-dom";

  import { TodoView } from "./TodoView";
  import { LoginView } from "./LoginView";

const App = () => {
  	return (
		<BrowserRouter>
		<Routes>
		<Route index path="/" element={<TodoView />} />
		<Route index path=":view" element={<TodoView />} />
		<Route index path="/login" element={<LoginView />} />
		</Routes>
	  </BrowserRouter>
	)
}

export default App;
