import 'styles/Home.scss';
import 'styles/App.scss';
import TaskList from 'components/Home/TaskList/TaskList.js';
import NotesContainer from 'components/Home/NotesContainer/NotesContainer.js';
import Hud from 'components/Home/Hud/Hud.js';
import WeekServices from 'services/week.js';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from 'App';
import TaskForm from 'components/Home/TaskForm/TaskForm';

/*
this component conditionally renders and edit task or a create task
form.
*/
const ModalPortal = ({ tasks, setTasks, formState, setFormState }) => {
	const [transitionProperties, setTransitionProperties] = useState({});

	/* 
	a small timeout between the creation of the form and then the adding the style of the form
	for the transition to take effect.
	if this dosent exist then the values visibility and opacity dont change thus no transition
	effect occurs.
	*/
	useEffect(() => {
		if (!formState?.type) {
			setTransitionProperties({});
		} else {
			setTimeout(() => {
				setTransitionProperties({ visibility: 'visible', opacity: 1 });
			}, 1);
		}
	}, [formState]);

	const handleBlur = (event) => {
		event.preventDefault();
		setFormState(null);
	};

	// tabIndex makes it so the div has focus and blur events and the -1 makes it not accessible by keyboard
	if (formState?.type === 'add' || formState?.type === 'edit') {
		return (
			<div
				className="taskModal"
				style={transitionProperties}
				onClick={handleBlur}
			>
				<div className="taskFormContainer" onClick={(e) => e.stopPropagation()}>
					<TaskForm
						tasks={tasks}
						setTasks={setTasks}
						formState={formState}
						setFormState={setFormState}
					/>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

const ErrorBar = ({ errorMessage }) => {
	// fix the FUCKIGN TRANSITION OF THIS COMPONENT
	return (
		<div
			className={errorMessage === null ? 'errorBarPortal' : 'badServerResponse'}
		>
			{errorMessage === undefined
				? 'failed to connect to server'
				: errorMessage}
		</div>
	);
};

const Home = () => {
	const [user, setUser] = useContext(UserContext);
	const [tasks, setTasks] = useState([]);
	const [notes, setNotes] = useState(null);
	/*
	formState is an object with the propreties
	type : refers to the type of the api call and form to open
	title
	description
	priority
	id
	*/
	const [formState, setFormState] = useState(null);
	const [weekDue, setWeekDue] = useState(null);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);

	const fetchActiveWeekTasksAndDueDate = useCallback(async () => {
		try {
			const retrievedData = await WeekServices.getActiveWeekasks(user.token);
			setTasks(retrievedData.tasks);
			setWeekDue(
				retrievedData.weekDue === null ? null : new Date(retrievedData.weekDue)
			);
		} catch (err) {
			setApiErrorMessage("fetching current week's data failed");
		}
	}, [user]);

	useEffect(() => {
		fetchActiveWeekTasksAndDueDate();
	}, []);

	useEffect(() => {
		if (apiErrorMessage) {
			setTimeout(() => {
				setApiErrorMessage(null);
			}, 5 * 1000);
		}
	}, [apiErrorMessage]);

	return (
		<div className="basePage">
			<div className="hudContainer">
				<Hud
					className="hud"
					tasks={tasks}
					setTasks={setTasks}
					setNotes={setNotes}
					weekDue={weekDue}
					setWeekDue={setWeekDue}
				/>
			</div>
			<main className="boardMain">
				<TaskList
					tasks={tasks}
					setTasks={setTasks}
					setFormState={setFormState}
				/>
				<div className="separatingVerticalLine"></div>
				<NotesContainer
					notes={notes}
					setNotes={setNotes}
					setApiErrorMessage={setApiErrorMessage}
				/>
			</main>
			<ModalPortal
				tasks={tasks}
				setTasks={setTasks}
				formState={formState}
				setFormState={setFormState}
			/>
			<ErrorBar errorMessage={apiErrorMessage} />
		</div>
	);
};

export default Home;
