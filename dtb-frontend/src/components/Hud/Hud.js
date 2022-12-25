import CompletionCircle from './PercentageCircle/CompletionCircle';
import WeekServices from '../../services/week.js';
import { useState, useEffect } from 'react';

/*

*/

const Hud = ({ user, tasks }) => {
	const [weekDue, setWeekDue] = useState(null);
	const [completion, setCompletion] = useState(null);
	const priorityMap = new Map();
	priorityMap.set('low', 1);
	priorityMap.set('medium', 4);
	priorityMap.set('high', 7);

	const fetchWeekDue = async () => {
		try {
			const retrievedData = await WeekServices.getCurrentWeekTasks(user.token);
			setWeekDue(
				retrievedData.weekDue === null ? null : new Date(retrievedData.weekDue)
			);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchWeekDue();
	}, []);

	useEffect(() => {
		let total = 0;
		let coeffTotal = 0;
		for (const task of tasks) {
			coeffTotal += priorityMap.get(task.priority);
		}
		for (const task of tasks) {
			total += (task.progress * priorityMap.get(task.priority)) / coeffTotal;
		}
		setCompletion(total);
		console.log(completion);
	}, [tasks]);

	return (
		<div className="hud">
			<div className="completion">
				<h3>completion</h3>
				<CompletionCircle sideSize={47} completion={Math.trunc(completion)} />
			</div>
			<div className="timeLeft">
				<h3>time left</h3>
				<h2>
					{weekDue !== null
						? ` ${Math.floor(
								(new Date(weekDue) - new Date()) / (1000 * 60 * 60 * 24)
						  )} Days ${Math.floor(
								((new Date(weekDue) - new Date()) % (1000 * 60 * 60 * 24)) /
									(1000 * 60 * 60)
						  )} Hours`
						: ' - Days - Hours'}
				</h2>
			</div>
		</div>
	);
};

export default Hud;
