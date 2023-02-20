import { useState, useCallback, useContext } from 'react';
import TaskServices from '../../../services/task.js';
import WeekServices from '../../../services/week.js';
import { UserContext } from '../../../App.js';

const TaskForm = ({ tasks, setTasks, formState, setFormState }) => {
	const [user, setUser] = useContext(UserContext);
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

	const postForm = async () => {
		const areRequirementsMet =
			titleField?.length > 0 && priorityField?.length > 0;

		if (!areRequirementsMet) {
			alert('Must fill all fields');
		} else {
			if (formState.type === 'edit') {
				const editedTask = {
					title: titleField,
					description: descriptionField,
					priority: priorityField,
					id: formState.id,
				};
				try {
					const returnedTask = await TaskServices.editTask(
						user.token,
						editedTask
					);
					const newTasks = tasks.map((task) =>
						task.id === formState.id
							? {
									...task,
									title: returnedTask.title,
									description: returnedTask.description,
									priority: returnedTask.priority,
							  }
							: task
					);
					setTasks(newTasks);
				} catch (err) {
					console.log(err);
				}
			} else if (formState.type === 'add') {
				try {
					const newTask = {
						title: titleField,
						description: descriptionField,
						priority: priorityField,
						progress: 0,
					};
					const activeWeekId = (await WeekServices.getActiveWeekId(user.token))
						.id;
					if (!activeWeekId) {
						const returnedTask = await WeekServices.initiateNewWeek(
							user.token,
							newTask
						);
						setTasks(tasks.concat(returnedTask));
					} else {
						const returnedTask = await TaskServices.addTask(
							user.token,
							activeWeekId,
							newTask
						);
						setTasks(tasks.concat(returnedTask));
					}
				} catch (err) {
					console.log(err);
				}
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
				<label htmlFor="taskNameInput">Name</label>
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
			<div className="priority">
				<p>Priority</p>
				<label htmlFor="high">high</label>
				<input
					type="radio"
					name="priority"
					value="high"
					onChange={handlePriorityChange}
					checked={priorityField === 'high'}
				/>
				<label htmlFor="medium">medium</label>
				<input
					type="radio"
					name="priority"
					value="medium"
					onChange={handlePriorityChange}
					checked={priorityField === 'medium'}
				/>
				<label htmlFor="low">low</label>
				<input
					type="radio"
					name="priority"
					value="low"
					onChange={handlePriorityChange}
					checked={priorityField === 'low'}
				/>
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
