import 'styles/Board.scss';
import 'styles/App.scss';
import TaskList from 'components/Board/TaskList/TaskList.js';
import NotesContainer from 'components/Board/NotesContainer/NotesContainer.js';
import Hud from 'components/Board/Hud/Hud.js';
import WeekServices from 'services/week.js';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext, useUser } from 'utils/useUser';
import TaskForm from 'components/Board/TaskForm/TaskForm';

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

const Board = () => {
	const { user, logOut } = useContext(UserContext);
	const [tasks, setTasks] = useState([]);
	const [formState, setFormState] = useState({
		type: null,
		title: null,
		description: null,
		priority: null,
		id: null,
	});
	const [apiErrorMessage, setApiErrorMessage] = useState(null);

	const fetchActiveWeekTasks = useCallback(async () => {
		try {
			const retrievedData = await WeekServices(logOut).getActiveWeekTasks(
				user.token
			);
			setTasks(retrievedData.tasks);
		} catch (err) {
			setApiErrorMessage("fetching current week's data failed");
		}
	}, [user]);

	useEffect(() => {
		fetchActiveWeekTasks();
	}, []);

	return (
		<div className="basePage">
			<div className="hudContainer">
				<Hud
					tasks={tasks}
					setTasks={setTasks}
					setApiErrorMessage={setApiErrorMessage}
				/>
			</div>
			<main className="boardMain">
				<TaskList
					tasks={tasks}
					setTasks={setTasks}
					setFormState={setFormState}
				/>
				<div className="separatingVerticalLine"></div>
				<NotesContainer setApiErrorMessage={setApiErrorMessage} />
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

export default Board;
