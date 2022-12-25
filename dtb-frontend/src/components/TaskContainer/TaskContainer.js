import { useEffect, useState } from 'react';
import taskServices from '../../services/task';

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
						<svg
							width="57"
							height="71"
							viewBox="0 0 57 71"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M4.04226 56.8036H3.72324C3.25674 56.8063 2.7943 56.7168 2.36243 56.5404C1.93056 56.364 1.53775 56.1041 1.20654 55.7756C0.837197 55.4076 0.553576 54.9627 0.375894 54.4725C0.198212 53.9824 0.130845 53.4591 0.178595 52.9399L1.70279 38.1587C1.86409 36.5396 2.57749 35.0251 3.72324 33.8697L35.625 1.96793C36.9535 0.845589 38.6482 0.250712 40.3867 0.296462C42.1251 0.342212 43.7862 1.0254 45.0538 2.21606L54.7661 11.9284C56.0702 13.1708 56.8286 14.8795 56.8751 16.6801C56.9216 18.4807 56.2524 20.2263 55.0142 21.5344L23.1124 53.4361C21.957 54.5819 20.4426 55.2953 18.8234 55.4566L4.04226 56.8036ZM49.8036 16.8554L40.1267 7.17856L33.2147 14.2678L42.7143 23.7675L49.8036 16.8554ZM28.5357 18.9468L8.5794 38.7613L7.62234 49.3598L18.2563 48.3673L38.1063 28.5173L28.5357 18.9468ZM3.72322 63.8929H53.3482C54.2883 63.8929 55.1899 64.2663 55.8547 64.9311C56.5194 65.5958 56.8929 66.4974 56.8929 67.4375C56.8929 68.3776 56.5194 69.2792 55.8547 69.9439C55.1899 70.6087 54.2883 70.9821 53.3482 70.9821H3.72322C2.78312 70.9821 1.88152 70.6087 1.21677 69.9439C0.552025 69.2792 0.178572 68.3776 0.178572 67.4375C0.178572 66.4974 0.552025 65.5958 1.21677 64.9311C1.88152 64.2663 2.78312 63.8929 3.72322 63.8929Z"
								fill="#D9D9D9"
							/>
						</svg>
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
