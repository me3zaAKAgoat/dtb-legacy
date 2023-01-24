import { useEffect, useState } from 'react';
import TaskContainer from '../TaskContainer/TaskContainer.js';
import AddTaskForm from '../AddTaskForm/AddTaskForm.js';
import EditTaskForm from '../EditTaskForm/EditTaskForm.js';
import TaskContextMenu from '../ContextMenus/TaskContextMenu';

/*
this component conditionally renders and edit task or a create task
form.
*/
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

	/* 
	a small timeout between the creation of the form and then the adding the style of the form
	for the transition to take effect.
	if this dosent exist then the values visibility and opacity dont change thus no transition
	effect occurs.
	*/
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
			<div className="taskModal" style={transitionProperties}>
				<div className="taskFormContainer">
					<AddTaskForm
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
			<div className="taskModal" style={transitionProperties}>
				<div className="taskFormContainer">
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

/*
this is component is a container for the list of tasks.

it is also the parent of task editing and task creating form modals which is done
through the state formToOpen that has a string name for later decision on which
of the two prior forms is to be open.

it is also the component that renders the context menu of tasks through the state 
contextMenu
*/
const TasksContainer = ({ user, tasks, setTasks }) => {
	const [formToOpen, setFormToOpen] = useState(null);
	const [taskToEdit, setTaskToEdit] = useState(null);
	const [contextMenu, setContextMenu] = useState({
		show: false,
		x: null,
		y: null,
		id: null,
	});
	return (
		<div className="mainChildrenContainers">
			<div className="mainChildrenTitle">Tasks</div>
			<div className="tasksContainer">
				<TaskContextMenu
					contextMenu={contextMenu}
					setContextMenu={setContextMenu}
					setFormToOpen={setFormToOpen}
					user={user}
					tasks={tasks}
					setTasks={setTasks}
				/>
				{tasks.map((task) => (
					<TaskContainer
						key={task.title + task.id}
						task={task}
						setTaskToEdit={setTaskToEdit}
						setFormToOpen={setFormToOpen}
						user={user}
						tasks={tasks}
						setTasks={setTasks}
						contextMenu={contextMenu}
						setContextMenu={setContextMenu}
					/>
				))}
				<button
					className="addTaskButton"
					onClick={() => {
						setFormToOpen('add');
					}}
				>
					<svg
						width="66"
						height="67"
						viewBox="0 0 66 67"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M33 65.0008C50.5244 65.0008 64.7308 50.7944 64.7308 33.27C64.7308 15.7456 50.5244 1.53925 33 1.53925C15.4756 1.53925 1.26923 15.7456 1.26923 33.27C1.26923 50.7944 15.4756 65.0008 33 65.0008ZM33 66.27C51.2254 66.27 66 51.4954 66 33.27C66 15.0446 51.2254 0.27002 33 0.27002C14.7746 0.27002 0 15.0446 0 33.27C0 51.4954 14.7746 66.27 33 66.27ZM32.4711 19.52C32.4711 19.1695 32.7552 18.8854 33.1057 18.8854H33.7403C34.0908 18.8854 34.3749 19.1695 34.3749 19.52V31.895H46.75C47.1005 31.895 47.3846 32.1791 47.3846 32.5296V33.1642C47.3846 33.5147 47.1005 33.7989 46.75 33.7989H34.3749V46.1739C34.3749 46.5244 34.0908 46.8085 33.7403 46.8085H33.1057C32.7552 46.8085 32.4711 46.5244 32.4711 46.1739V33.7989H20.0962C19.7457 33.7989 19.4615 33.5147 19.4615 33.1642V32.5296C19.4615 32.1791 19.7457 31.895 20.0962 31.895H32.4711V19.52Z"
							fill="#cccccc"
						/>
					</svg>
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
