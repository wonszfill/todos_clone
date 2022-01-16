import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChevronDown from './icons/Chevron.png'

import { TodoItem } from './components/todoItem/todoItem';
import { AddItem } from './components/addItem/AddItem';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import {PALLETE} from './colors/PALLETE'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { getFromJSON, patchToJSON, deleteFromJSON } from './helpers/contactJSON';

const StyledApp = styled.div`
	display: flex;
	justify-content: center;
`

const StyledAppWraper = styled.div`
	width: 100%;
	max-width: 550px;
`

const StyledAppTitle = styled.h1`
	font-size: 6rem;
	color: ${PALLETE.titleRedish};
	margin: 1rem;
`
const StyledTopBarWithInput = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-start;
	align-items: center;
	padding: 0 0.4rem;
`

const StyledToggleButton = styled.div`
	margin: 0.8rem 0.4rem;
	margin-left: 1.2rem;
	padding: 0.1rem;
	cursor: pointer;
`

const StyledToggleChevron = styled.img`
	width:1rem;
	opacity: 0.2;
`

const StyledTodosWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: white;
	box-shadow: 0 0px 4px 1px ${PALLETE.shadowBlack}, 0 25px 50px 0 rgba(0, 0, 0, 0.1);
	z-index: 5;
`

const StyledSummary = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	padding: 0;
	background: white;
	border-top: 1px solid ${PALLETE.borderGray};
	width: 100%;
	box-sizing: border-box;
	box-shadow: 0 5px 4px 0 rgba(0, 0, 0, 0.2);
	font-size: 0.8rem;
	&:before{
		content: "";
		position: absolute;
		top: 100%;
		left:1.2%;
		width: 97.6%;
		height: 0.62rem;
		background: rgba(256, 256, 256, 0.5);
		box-shadow: 0 2px 4px 0 ${PALLETE.shadowBlack};
		z-index: 1;
	};
	&:after{
		content: "";
		position: absolute;
		top: 100%;
		left: .5%;
		width: 99%;
		height: 0.31rem;
		background: white;
		box-shadow: 0 2px 4px 0 ${PALLETE.shadowBlack}, inset 0px 1px 1px 1px ${PALLETE.shadowBlack};
		z-index: 2;
	}
	/* I wrote it like that, so it works with react animation group, padding in animated el wont work */
	& > * {
		margin: 1rem;
	}
`

const StyledNavLink = styled(NavLink)`
	padding: 0.2rem 0.5rem;
	text-decoration: none;
	color: inherit;
	border-radius: 0.2rem;
	&.active{
		border:1px solid ${PALLETE.borderGray};
	}
`

const StyledRemoval = styled.div`
	cursor: pointer;
	visibility: ${props => props.isVisible ? "visible;": "hidden;"};
	&:hover{
		text-decoration: underline;
	}
`

const StyledFooter = styled.div`
	padding: 1rem;
	margin-top: 4rem;
	line-height: 2;
	color: ${PALLETE.borderGray};
`

const StyledTransitionGroup = styled(TransitionGroup)`
	display: block;
	width: 100%;
	overflow: hidden;
`

export function TodoView() {


  	const [notes, setNotes] = useState([]);
	const [leftCounter, setLeftCounter] = useState(0);
	const [globalIsDone, setGlobalIsDone] = useState(true);
	const [areAnyNotes, setAreAnyNotes] = useState(false);
	const [isDoneRemovalVisible, setIsDoneRemovalVisible] = useState(false);

	const [isSync, setIsSync] = useState(false);

	useEffect(() => {
		if (!isSync) {
			fetch('http://localhost:4000/')
			.then(res => res.json())
			.then(data => setNotes(data));
			setIsSync(true);
		}
	})
	console.log(notes)
/* 	useEffect(() => {
		fetch('http://localhost:4000/')
		.then(res => res.json())
		.then(data => console.log(data))
	}) */

	useEffect(() => {
		setAreAnyNotes(notes[0] ? true : false);
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes, leftCounter])

	useEffect(() => {
		setIsDoneRemovalVisible(notes.length>(notes.length - leftCounter) ? true : false);
	}, [leftCounter, isSync])

	const leftCounterReducer = (sum, current) => {
		return sum + current.isDone * 1;
	}

	const ClearCompleted = () => {
		notes.filter((note => note.isDone)).forEach(note => {
			deleteFromJSON(note.id);
		});
		const deletedNoteIds = notes.filter((note => note.isDone))
			.map(note => note._id);
			fetch(`http://localhost:4000/`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(deletedNoteIds)
			})
		setNotes(oldNotes => oldNotes.filter((note => !note.isDone)))
	}

	const ToggleAllNotes = () => {
		setNotes(oldNotes => oldNotes.map(oldNote =>{
			if (oldNote.isDone !== globalIsDone) {
				patchToJSON(oldNote.id, "isDone", globalIsDone)
			}
			oldNote.isDone = globalIsDone;
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
							<StyledToggleChevron src={ChevronDown} alt="Chevron" />
						</StyledToggleButton>
						<AddItem setNotes={setNotes}/>
					</StyledTopBarWithInput>

					<StyledTransitionGroup>
						{ displayNotes.map((note) => (
							<CSSTransition
								key={note.id}
								timeout={300}
								classNames="item"
							>
								<TodoItem 
									note={note}
									setNotes={setNotes}
									setLeftCounter={setLeftCounter}
								/>
							</CSSTransition>
						))}
					</StyledTransitionGroup>

					<CSSTransition
									in={areAnyNotes}
									key={"summary"}
									timeout={300}
									classNames="summary"
									unmountOnExit
					>
						<StyledSummary>
							<div>
								{notes.length - leftCounter} items left
							</div>
							<div>
								<StyledNavLink to="/">All</StyledNavLink> 
								<StyledNavLink to="/active">Active</StyledNavLink> 
								<StyledNavLink to="/completed">Completed</StyledNavLink>
							</div>
							<CSSTransition
								in={isDoneRemovalVisible}
								key={"removeDone"}
								timeout={300}
								classNames="summary"
							>
								<StyledRemoval 
									onClick={ClearCompleted} 
									isVisible={isDoneRemovalVisible}
								>
									Clear completed
								</StyledRemoval>
							</CSSTransition>
						</StyledSummary>
					</CSSTransition>
				</StyledTodosWrapper>
				<StyledFooter>
				<p>Double-click to edit a todo</p>
				<p>
				Created by Oscar Godson
				</p><p>
				Refactored by Christoph Burgmer
				</p><p>
				Recreated by Przemek Wojszwiłło
				</p>
				</StyledFooter>
			</StyledAppWraper>
		</StyledApp>
	)
}
