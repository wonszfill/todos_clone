import { useState } from 'react';
import styled from 'styled-components';
import './App.css';

import { TodoItem } from './components/todoItem/todoItem';
import { AddItem } from './components/addItem/AddItem';

const StyledApp = styled.div`
	display: flex;
	justify-content: center;
`

const StyledAppWraper = styled.div`
	width: 100%;
	max-width: 500px;
`

const StyledAppTitle = styled.h1`
	font-size: 6rem;
	opacity: 0.1;
	margin: 1rem;
`

const StyledTodosWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: white;
	box-shadow: grey 5px 5px 25px -5px;
`

function App() {

	

  	const [notes, setNotes] = useState([]);

  	return (
	  	<StyledApp>
			<StyledAppWraper>
				<StyledAppTitle>todos</StyledAppTitle>
				<StyledTodosWrapper>
					<AddItem setNotes={setNotes}/>
					{ notes.map((note, index) => 
						<TodoItem note={note} index={index}/>
					)}
				</StyledTodosWrapper>
			</StyledAppWraper>
		</StyledApp>
	)
}

export default App;
