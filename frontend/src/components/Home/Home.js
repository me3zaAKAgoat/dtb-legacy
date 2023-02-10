import '../../styles/Home.scss';
import TasksContainer from './TasksContainer/TasksContainer.js';
import NotesContainer from './NotesContainer/NotesContainer.js';
import Hud from './Hud/Hud.js';
import WeekServices from '../../services/week.js';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import TaskForm from './TaskForm/TaskForm';

/*
this component conditionally renders and edit task or a create task
form.
*/
const FormRenderingComponent = ({
	tasks,
	setTasks,
	formState,
	setFormState,
}) => {
	const [transitionProperties, setTransitionProperties] = useState({});
	const [user, setUser] = useContext(UserContext);

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
	}, [formState?.type]);

	if (formState?.type === 'add' || formState?.type === 'edit') {
		return (
			<div className="taskModal" style={transitionProperties}>
				<div className="taskFormContainer">
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

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [user, setUser] = useContext(UserContext);
	const [formState, setFormState] = useState(null);

	const fetchCurrentWeekTasks = useCallback(async () => {
		try {
			const retrievedData = await WeekServices.getCurrentWeekTasks(user.token);
			setTasks(retrievedData.tasks);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		fetchCurrentWeekTasks();
	}, []);

	return (
		<div className="home">
			<div className="hudContainer">
				<Hud className="hud" tasks={tasks} />
			</div>
			<main className="main">
				<TasksContainer
					tasks={tasks}
					setTasks={setTasks}
					setFormState={setFormState}
				/>
				<div className="separatingVerticalLine"></div>
				<NotesContainer />
			</main>
			<FormRenderingComponent
				tasks={tasks}
				setTasks={setTasks}
				formState={formState}
				setFormState={setFormState}
			/>
		</div>
	);
};

export default Home;

/*
Use the user.token argument only once in fetchCurrentWeekTasks, instead of passing it to the method each time it is called.

Use the user argument as a dependency in the useEffect hook to avoid fetching the tasks every time the component is re-rendered.

Implement error handling for the API call, for example, by displaying an error message to the user when the call fails.
*/
