import { useEffect, useState } from 'react';
import taskServices from '../../services/task';
import editPng from './editButton.png';

const taskContainerOpenStyleTransition = {
	backgroundColor: '2d2d2d',
	minHeight: '200px',
};

const debounce = (callback, wait) => {
	let timeoutId = null;

	return (...args) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			callback(...args);
		}, wait);
	};
};
const updateTaskProgress = debounce(async (token, task, progress) => {
	await taskServices.updateProgress(token, {
		id: task.id,
		progress: progress,
	});
}, 2000);

const TaskContainer = ({
	task,
	setTaskToEdit,
	setFormToOpen,
	user,
	globalProgress,
	setGlobalProgress,
	tasks,
}) => {
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [progress, setProgress] = useState(task.progress);
	const [open, setOpen] = useState(false);
	const priorityMap = new Map();
	priorityMap.set('low', 1);
	priorityMap.set('medium', 4);
	priorityMap.set('high', 7);

	const handleProgressChange = (e) => {
		if (e.target.value > 100) setProgress(100);
		else if (0 > e.target.value) setProgress(0);
		else setProgress(e.target.value);
	};

	useEffect(() => {
		updateTaskProgress(
			user.token,
			task,
			progress,
			tasks,
			setGlobalProgress,
			globalProgress,
			priorityMap
		);
	}, [progress]);

	return (
		<div
			className="taskContainer"
			style={open ? taskContainerOpenStyleTransition : {}}
		>
			<button
				onClick={() => {
					setOpen(!open);
				}}
			>
				{title}
			</button>
			<div
				className="expandedContainer"
				style={
					open
						? {
								visibility: 1,
								opacity: 1,
						  }
						: {
								visibility: 0,
								opacity: 0,
						  }
				}
			>
				<p>{description}</p>
				<div className="sliderEditButtonContainer">
					<button
						className="editTaskButton"
						type="button"
						onClick={() => {
							setTaskToEdit(task);
							setFormToOpen('edit');
						}}
					>
						<img src={editPng} />
					</button>
					<input
						type="range"
						className="progressionSlider"
						min={0}
						max={100}
						value={progress}
						onChange={handleProgressChange}
					/>
					<input
						min={0}
						max={100}
						type="number"
						value={progress}
						onChange={handleProgressChange}
					></input>
				</div>
			</div>
		</div>
	);
};

export default TaskContainer;
