import { useState } from 'react';
import styled from 'styled-components';
import './App.css';

import { TodoItem } from './components/todoItem/todoItem';
import { AddItem } from './components/addItem/AddItem';

function App() {

	

  	const [notes, setNotes] = useState([]);

  	return <div>
		  <AddItem setNotes={setNotes}/>
		{ notes.map((note, index) => 
			<TodoItem note={note} index={index}/>
		)}
		</div>
}

export default App;
