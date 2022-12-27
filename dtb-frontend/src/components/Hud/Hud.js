import CompletionCircle from './PercentageCircle/CompletionCircle';
import WeekServices from '../../services/week.js';
import { useState, useEffect } from 'react';

/*

*/

const Hud = ({ user, tasks }) => {
	const [weekDue, setWeekDue] = useState(null);

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

	console.log(tasks, 'hud');

	return (
		<div className="hud">
			<div className="completion">
				<h3>Completion</h3>
				<CompletionCircle sideSize={47} tasks={tasks} />
			</div>
			<div className="timeLeft">
				<h3>Time left</h3>
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
