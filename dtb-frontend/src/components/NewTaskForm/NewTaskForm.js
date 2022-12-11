import { useEffect, useRef, useState } from 'react';
import TaskServices from '../../services/task.js';
import WeekServices from '../../services/week.js';

const NewTaskForm = ({ tasks, setTasks, user, setFormToOpen }) => {
	const initialRender = useRef(true);
	const [nameField, setUsernameField] = useState('');
	const [descriptionField, setDescriptionField] = useState('');
	const [priorityField, setPriorityField] = useState('');
	const [newTaskFormSubmitted, setNewTaskFormSubmitted] = useState(false);

	const handleUsernameField = (e) => {
		setUsernameField(e.target.value);
	};

	const handleDescriptionField = (e) => {
		setDescriptionField(e.target.value);
	};

	const handleRadioChange = (e) => {
		setPriorityField(e.target.value);
	};

	const fetchCurrentWeekTasksId = async () => {
		try {
			const currentWeekId = await WeekServices.getCurrentWeekId(user.token);
			return currentWeekId === {} ? null : currentWeekId.currentWeek;
		} catch (err) {
			console.log('current week fetch failed', err);
		}
	};

	const addNewTask = async () => {
		const fitsRequirements = [nameField, descriptionField, priorityField].every(
			(field) => {
				return field.length > 0;
			}
		);
		if (!fitsRequirements) {
			alert('Must fill all fields');
		} else {
			try {
				const newTask = {
					title: nameField,
					description: descriptionField,
					priority: priorityField,
					progress: 0,
				};
				setFormToOpen(null);
				const currentWeekId = await fetchCurrentWeekTasksId();
				if (!currentWeekId) {
					const returnedTask = await WeekServices.initiateNewWeek(
						user.token,
						newTask
					);
					setTasks(tasks.concat(returnedTask));
				} else {
					const returnedTask = await TaskServices.addTask(
						user.token,
						currentWeekId,
						newTask
					);
					setTasks(tasks.concat(returnedTask));
				}
				setUsernameField('');
				setDescriptionField('');
				setPriorityField('');
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
		} else {
			addNewTask();
		}
	}, [newTaskFormSubmitted]);

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				setNewTaskFormSubmitted(!newTaskFormSubmitted);
			}}
		>
			<h1>Add a new task</h1>
			<div className="taskNameContainer">
				<label htmlFor="taskNameInput">Name</label>
				<input
					type="text"
					id="taskNameInput"
					value={nameField}
					placeholder="Type your task's title"
					onChange={handleUsernameField}
					autoComplete="off"
				/>
			</div>
			<div className="taskDescriptionContainer">
				<label htmlFor="taskDescriptionInput">Description</label>
				<textarea
					type="textarea"
					id="taskDescriptionInput"
					value={descriptionField}
					placeholder="Type your task's description"
					onChange={handleDescriptionField}
				/>
			</div>
			<div className="priority">
				<p>Set the priority</p>
				<label htmlFor="high">high</label>
				<input
					type="radio"
					name="priority"
					value="high"
					onChange={handleRadioChange}
				/>
				<label htmlFor="medium">medium</label>
				<input
					type="radio"
					name="priority"
					value="medium"
					onChange={handleRadioChange}
				/>
				<label htmlFor="low">low</label>
				<input
					type="radio"
					name="priority"
					value="low"
					onChange={handleRadioChange}
				/>
			</div>
			<div className="buttonsContainer">
				<button className="submitButton" type="submit">
					Submit
				</button>
				<button
					className="cancelButton"
					type="button"
					onClick={() => {
						setFormToOpen(null);
						setUsernameField('');
						setDescriptionField('');
						setPriorityField('');
					}}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default NewTaskForm;
