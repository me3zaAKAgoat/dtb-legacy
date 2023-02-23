import CompletionCircle from './CompletionCircle/CompletionCircle';
import WeekServices from 'services/week';
import { useContext, useCallback } from 'react';
import { UserContext, useUser } from 'utils/useUser';

const Hud = ({ tasks, setTasks, setNotes, weekDue, setWeekDue }) => {
	const { user, logOut } = useContext(UserContext);

	const handleConclude = useCallback(async () => {
		const userConfirms = window.confirm('You will conclude this week now');
		if (userConfirms) {
			try {
				const res = await WeekServices(logOut).concludeWeek(user.token);
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
				<h2>Completion:</h2>
				<CompletionCircle containerSquareSideLength={47} tasks={tasks} />
			</div>
			<div className="timeLeft">
				<h2>Time left:</h2>
				<h3>
					{weekDue !== null
						? ` ${Math.floor(
								(new Date(weekDue) - new Date()) / (1000 * 60 * 60 * 24)
						  )} Days ${Math.floor(
								((new Date(weekDue) - new Date()) % (1000 * 60 * 60 * 24)) /
									(1000 * 60 * 60)
						  )} Hours`
						: ' - Days - Hours'}
				</h3>
			</div>
			<button className="baseButton concludeButton" onClick={handleConclude}>
				Conclude
			</button>
		</div>
	);
};

export default Hud;
