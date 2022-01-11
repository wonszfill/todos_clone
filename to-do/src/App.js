import {
	BrowserRouter,
	Routes,
	Route
  } from "react-router-dom";

  import { TodoView } from "./TodoView";

const App = () => {
  	return (
		<BrowserRouter>
		<Routes>
		<Route index path="/" element={<TodoView />} />
			<Route index path=":view" element={<TodoView />} />
		</Routes>
	  </BrowserRouter>
	)
}

export default App;
