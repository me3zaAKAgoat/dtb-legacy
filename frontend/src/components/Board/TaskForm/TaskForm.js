import { useState, useCallback, useContext } from 'react';
import TaskServices from 'services/task.js';
import WeekServices from 'services/week.js';
import { UserContext, useUser } from 'utils/useUser';

const TaskForm = ({
	tasks,
	setTasks,
	formState,
	setFormState,
	setDisplayBoard,
}) => {
	const { user, logOut } = useContext(UserContext);
	const [titleField, setTitleField] = useState(formState.title);
	const [descriptionField, setDescriptionField] = useState(
		formState.description
	);
	const [priorityField, setPriorityField] = useState(formState.priority);

	const handleTitleChange = (e) => {
		setTitleField(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescriptionField(e.target.value);
	};

	const handlePriorityChange = (e) => {
		setPriorityField(e.target.value);
	};

	const clearForm = useCallback(() => {
		setTitleField('');
		setDescriptionField('');
		setPriorityField('');
	}, []);

	const editTask = useCallback(
		async (editedTitle, editedDescription, editedPriority) => {
			const editedTask = {
				title: editedTitle,
				description: editedDescription,
				priority: editedPriority,
				id: formState.id,
			};
			try {
				await TaskServices(logOut).editTask(user.token, editedTask);
				const newTasks = tasks.map((task) =>
					task.id === formState.id
						? {
								...task,
								title: editedTask.title,
								description: editedTask.description,
								priority: editedTask.priority,
						  }
						: task
				);
				setTasks(newTasks);
			} catch (err) {
				console.log(err);
			}
		},
		[formState, user]
	);

	const addTask = useCallback(
		async (newTitle, newDescription, newPriority) => {
			try {
				const newTask = {
					title: newTitle,
					description: newDescription,
					priority: newPriority,
					progress: 0,
				};
				const returnedTask = await TaskServices(logOut).addTask(
					user.token,
					newTask
				);
				setTasks(tasks.concat(returnedTask));
			} catch (err) {
				console.log(err);
			}
		},
		[user]
	);

	const postForm = () => {
		if (!titleField?.length) alert('Type in a title please');
		else if (!priorityField?.length) alert('Select a priority please');
		else {
			if (formState.type === 'edit') {
				editTask(titleField, descriptionField, priorityField);
			} else if (formState.type === 'add') {
				addTask(titleField, descriptionField, priorityField);
				setDisplayBoard(true);
			}
			setFormState(null);
			clearForm();
		}
	};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<h1>{formState.type === 'add' ? 'Add a new task' : 'Edit the task'}</h1>
			<div className="taskNameContainer">
				<label htmlFor="taskNameInput">Title</label>
				<input
					type="text"
					id="taskNameInput"
					value={titleField ?? ''}
					placeholder="Type your task's title"
					onChange={handleTitleChange}
					autoComplete="off"
				/>
			</div>
			<div className="taskDescriptionContainer">
				<label htmlFor="taskDescriptionInput">Description (optional)</label>
				<textarea
					type="textarea"
					id="taskDescriptionInput"
					value={descriptionField ?? ''}
					placeholder="Type your task's description"
					onChange={handleDescriptionChange}
				/>
			</div>
			<div className="priorityContainer">
				<label>Priority</label>
				<div className="inputOptions">
					<div className="highOption">
						<label htmlFor="high">High</label>
						<input
							type="radio"
							name="priority"
							value="high"
							onChange={handlePriorityChange}
							checked={priorityField === 'high'}
						/>
					</div>
					<div className="mediumOption">
						<label htmlFor="medium">Medium</label>
						<input
							type="radio"
							name="priority"
							value="medium"
							onChange={handlePriorityChange}
							checked={priorityField === 'medium'}
						/>
					</div>
					<div className="lowOption">
						<label htmlFor="low">Low</label>
						<input
							type="radio"
							name="priority"
							value="low"
							onChange={handlePriorityChange}
							checked={priorityField === 'low'}
						/>
					</div>
				</div>
			</div>
			<div className="buttonsContainer">
				<button
					className="baseButton submitButton"
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						postForm();
					}}
				>
					Submit
				</button>
				<button
					className="baseButton cancelButton"
					type="button"
					onClick={() => {
						setFormState(null);
						clearForm();
					}}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default TaskForm;
