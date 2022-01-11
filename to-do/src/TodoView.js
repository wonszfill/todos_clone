import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChevronDown from './icons/Chevron.png'

import { TodoItem } from './components/todoItem/todoItem';
import { AddItem } from './components/addItem/AddItem';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

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

const StyledChevron = styled.img`
	width:1rem;
	opacity: 0.2;
`

const StyledTodosWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: white;
	box-shadow: grey 5px 5px 25px -5px;
`

const StyledSummary = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	background: white;
	border-top: 1px solid rgba(128,128,128,0.3);
	width: 100%;
	box-sizing: border-box;
`

const StyledNavLink = styled(NavLink)`
	padding: 0.2rem 0.5rem;
	text-decoration: none;
	color: black;
	border-radius: 0.2rem;
	&.active{
		border:1px solid grey;
	}
`

const StyledRemoval = styled.div`
	cursor: pointer;
	visibility: ${props => props.isHidden ? "visible;": "hidden;"};
	&:hover{
		text-decoration: underline;
	}
	
`

const StyledToggleButton = styled.div`
	margin-left: 1rem;
	padding:0.1rem;
	cursor: pointer;
`

const StyledTopBarWithInput = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-start;
	align-items: center;
`

export function TodoView() {

  	const [notes, setNotes] = useState([]);
	const [leftCounter, setLeftCounter] = useState(0);
	const [globalIsDone, setGlobalIsDone] = useState(true);

	const leftCounterReducer = (sum, current) => {
		return sum + current.isDone * 1;
	}

	const ClearCompleted = () => {
		setNotes(oldNotes => oldNotes.filter((note => !note.isDone)))
	}

	const ToggleAllNotes = () => {
		setNotes(oldNotes => oldNotes.map(oldNote =>{ 
			oldNote.isDone=globalIsDone;
			return oldNote;
			})
		);
		setGlobalIsDone(oldState => !oldState);
	}

	useEffect(()=>{
		setLeftCounter(notes.reduce(leftCounterReducer, 0))
	});

	const view = useParams().view;

	let displayNotes = notes;

		if (view === "active"){
			displayNotes = (notes.filter(note => note.isDone === false))
		}
		if (view === "completed"){
			displayNotes = (notes.filter(note => note.isDone === true))
		}

  	return (
	  	<StyledApp>
			<StyledAppWraper>
				<StyledAppTitle>todos</StyledAppTitle>
				<StyledTodosWrapper>
					<StyledTopBarWithInput>
						<StyledToggleButton onClick={ToggleAllNotes}>
							<StyledChevron src={ChevronDown} alt="Chevron" />
						</StyledToggleButton>
						<AddItem setNotes={setNotes}/>
					</StyledTopBarWithInput>
					
					{ displayNotes.map((note, index) => 
						<TodoItem 
							key={index + note}
							note={note} 
							index={index}
							setNotes={setNotes}
							setLeftCounter={setLeftCounter}
						/>
					)}
					{notes[0] && <StyledSummary>
						<div>
							{notes.length - leftCounter} items left
						</div>
						<div>
							<StyledNavLink activeClassName="active" to="/">All</StyledNavLink> 
							<StyledNavLink activeClassName="active" to="/active">Active</StyledNavLink> 
							<StyledNavLink activeClassName="active" to="/completed">Completed</StyledNavLink>
						</div>
						<StyledRemoval 
							onClick={ClearCompleted} 
							isHidden={notes.length>(notes.length - leftCounter)}
						>
							Clear completed
						</StyledRemoval>
					</StyledSummary>}
				</StyledTodosWrapper>
				
			</StyledAppWraper>
		</StyledApp>
	)
}
