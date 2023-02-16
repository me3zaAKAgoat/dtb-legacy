import CompletionCircle from './PercentageCircle/CompletionCircle';
import WeekServices from '../../../services/week.js';
import { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../../../App.js';

const Hud = ({ tasks, setTasks, setNotes, weekDue, setWeekDue }) => {
	const [user, setUser] = useContext(UserContext);

	const handleConclude = useCallback(async () => {
		const userConfirms = window.confirm('You will conclude this week now');
		if (userConfirms) {
			try {
				const res = await WeekServices.concludeWeek(user.token);
				if (res.status >= 200 && res.status < 300) {
					setTasks([]);
					setWeekDue(null);
					setNotes('');
				}
			} catch (err) {
				console.error(err);
			}
		}
	}, []);

	return (
		<div className="hud">
			<div className="completion">
				<h3>Completion:</h3>
				<CompletionCircle sideSize={47} tasks={tasks} />
			</div>
			<div className="timeLeft">
				<h3>Time left:</h3>
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
			<button className="concludeButton" onClick={handleConclude}>
				CONCLUDE
			</button>
		</div>
	);
};

export default Hud;
