import { useEffect, useRef, useState } from 'react';
import TaskServices from '../../services/task.js';

const EditTaskForm = ({
	user,
	taskToEdit,
	setTaskToEdit,
	tasks,
	setTasks,
	setFormToOpen,
}) => {
	const initialRender = useRef(true);
	const [nameField, setNameField] = useState(taskToEdit.title);
	const [descriptionField, setDescriptionField] = useState(
		taskToEdit.description
	);
	const [priorityField, setPriorityField] = useState(taskToEdit.priority);
	const [editFormSubmitted, setEditFormSubmitted] = useState(false);

	const handleNameField = (e) => {
		setNameField(e.target.value);
	};

	const handleDescriptionField = (e) => {
		setDescriptionField(e.target.value);
	};

	const handleRadioChange = (e) => {
		setPriorityField(e.target.value);
	};

	const editTask = async () => {
		const fitsRequirements = [nameField, descriptionField, priorityField].every(
			(field) => {
				return field.length > 0;
			}
		);

		if (!fitsRequirements) {
			alert('Must fill all fields');
		} else {
			const editedTask = {
				title: nameField,
				description: descriptionField,
				priority: priorityField,
				id: taskToEdit.id,
			};
			setFormToOpen(null);
			try {
				const returnedTask = await TaskServices.editTask(
					user.token,
					editedTask
				);
				const newTasks = tasks.map((task) => {
					if (task.id === taskToEdit.id) {
						task.title = returnedTask.title;
						task.description = returnedTask.description;
						task.priority = returnedTask.priority;
						return task;
					} else {
						return task;
					}
				});
				setTasks(newTasks);
				setTaskToEdit(null);
				setNameField('');
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
			editTask();
		}
	}, [editFormSubmitted]);

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				setEditFormSubmitted(!editFormSubmitted);
			}}
		>
			<h1>Edit the task</h1>
			<div className="taskNameContainer">
				<label htmlFor="taskNameInput">Name</label>
				<input
					type="text"
					id="taskNameInput"
					value={nameField}
					placeholder="Type your task's title"
					onChange={handleNameField}
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
					checked={priorityField === 'high'}
				/>
				<label htmlFor="medium">medium</label>
				<input
					type="radio"
					name="priority"
					value="medium"
					onChange={handleRadioChange}
					checked={priorityField === 'medium'}
				/>
				<label htmlFor="low">low</label>
				<input
					type="radio"
					name="priority"
					value="low"
					onChange={handleRadioChange}
					checked={priorityField === 'low'}
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
						setTaskToEdit(null);
						setFormToOpen(null);
						setNameField('');
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

export default EditTaskForm;
