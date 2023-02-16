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

	const handleTitleField = (e) => {
		setTitleField(e.target.value);
	};

	const handleDescriptionField = (e) => {
		setDescriptionField(e.target.value);
	};

	const handlePriorityField = (e) => {
		setPriorityField(e.target.value);
	};

	const clearFormFields = useCallback(() => {
		setTitleField('');
		setDescriptionField('');
		setPriorityField('');
	}, []);

	const requestTaskService = async () => {
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
					const activeWeekId = (await WeekServices.getactiveWeekId(user.token))
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
					clearFormFields();
				} catch (err) {
					console.log(err);
				}
			}
			setFormState(null);
			clearFormFields();
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
					onChange={handleTitleField}
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
					onChange={handlePriorityField}
					checked={priorityField === 'high'}
				/>
				<label htmlFor="medium">medium</label>
				<input
					type="radio"
					name="priority"
					value="medium"
					onChange={handlePriorityField}
					checked={priorityField === 'medium'}
				/>
				<label htmlFor="low">low</label>
				<input
					type="radio"
					name="priority"
					value="low"
					onChange={handlePriorityField}
					checked={priorityField === 'low'}
				/>
			</div>
			<div className="buttonsContainer">
				<button
					className="submitButton"
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						requestTaskService();
					}}
				>
					Submit
				</button>
				<button
					className="cancelButton"
					type="button"
					onClick={() => {
						setFormState(null);
						clearFormFields();
					}}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default TaskForm;

/*
To improve the code, the following suggestions can be made:

Instead of using editFormSubmitted state, use useState hook for form inputs and update the task in the useEffect hook when any of the inputs change.

Add a disabled attribute to the submit button when all fields are not filled, to prevent unnecessary API requests.

Refactor the logic for checking if all required fields are filled to a separate function.

Consider adding error handling for the API request in editTask function.

Use the onClick event of the submit button to trigger the editTask function instead of onSubmit.
*/
