import { useEffect, useState } from 'react';
import TaskContainer from '../TaskContainer/TaskContainer.js';
import plusSign from './plusCircle.png';
import WeekServices from '../../services/week.js';
import NewTaskForm from '../NewTaskForm/NewTaskForm.js';
import EditTaskForm from '../EditTaskForm/EditTaskForm.js';

const FormRenderingComponent = ({
	formToOpen,
	setFormToOpen,
	user,
	taskToEdit,
	setTaskToEdit,
	tasks,
	setTasks,
}) => {
	const [transitionProperties, setTransitionProperties] = useState({});

	useEffect(() => {
		if (!formToOpen) {
			setTransitionProperties({});
		} else {
			setTimeout(() => {
				setTransitionProperties({ visibility: 'visible', opacity: 1 });
			}, 1);
		}
	}, [formToOpen]);
	if (formToOpen === 'add') {
		return (
			<div className="createTaskModal" style={transitionProperties}>
				<div className="tasksInitiationInputsContainer">
					<NewTaskForm
						tasks={tasks}
						setTasks={setTasks}
						user={user}
						setFormToOpen={setFormToOpen}
					/>
				</div>
			</div>
		);
	} else if (formToOpen === 'edit') {
		return (
			<div className="createTaskModal" style={transitionProperties}>
				<div className="tasksInitiationInputsContainer">
					<EditTaskForm
						user={user}
						taskToEdit={taskToEdit}
						setTaskToEdit={setTaskToEdit}
						tasks={tasks}
						setTasks={setTasks}
						setFormToOpen={setFormToOpen}
					/>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

const TasksContainer = ({ user }) => {
	const [weekDue, setWeekDue] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [formToOpen, setFormToOpen] = useState(null);
	const [taskToEdit, setTaskToEdit] = useState(null);
	const [globalProgress, setGlobalProgress] = useState(0);
	const priorityMap = new Map();
	priorityMap.set('low', 1);
	priorityMap.set('medium', 4);
	priorityMap.set('high', 7);

	const fetchCurrentWeekTasks = async () => {
		try {
			const retrievedData = await WeekServices.getCurrentWeekTasks(user.token);
			setTasks(retrievedData.tasks);
			setWeekDue(
				retrievedData.weekDue === null ? null : new Date(retrievedData.weekDue)
			);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchCurrentWeekTasks();
	}, []);

	return (
		<div className="tasksContainer">
			<div className="weekHUD">
				<div className="timeLeft">
					Time Left:
					{weekDue !== null
						? ` ${Math.floor(
								(new Date(weekDue) - new Date()) / (1000 * 60 * 60 * 24)
						  )} Days ${Math.floor(
								((new Date(weekDue) - new Date()) % (1000 * 60 * 60 * 24)) /
									(1000 * 60 * 60)
						  )} Hours`
						: ' - Days - Hours'}
				</div>
			</div>
			<div className="tasksSection">
				{tasks.map((task) => (
					<TaskContainer
						key={task.title + task.id}
						task={task}
						setTaskToEdit={setTaskToEdit}
						setFormToOpen={setFormToOpen}
						user={user}
						globalProgress={globalProgress}
						setGlobalProgress={setGlobalProgress}
						tasks={tasks}
					/>
				))}
				<button
					className="addTaskButton"
					onClick={() => {
						setFormToOpen('add');
					}}
				>
					<img src={plusSign}></img>
				</button>
			</div>
			<FormRenderingComponent
				user={user}
				taskToEdit={taskToEdit}
				setTaskToEdit={setTaskToEdit}
				tasks={tasks}
				setTasks={setTasks}
				formToOpen={formToOpen}
				setFormToOpen={setFormToOpen}
			/>
		</div>
	);
};

export default TasksContainer;
