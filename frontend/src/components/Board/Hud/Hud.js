import CompletionCircle from './CompletionCircle/CompletionCircle';
import WeekServices from 'services/week';
import { useContext, useState, useCallback, useEffect } from 'react';
import { UserContext } from 'utils/useUser';

const Hud = ({ tasks, setTasks, setApiErrorMessage, setDisplayBoard }) => {
	const { user, logOut } = useContext(UserContext);
	const [weekDue, setWeekDue] = useState(null);

	const handleConclude = useCallback(async () => {
		const userConfirms = window.confirm('You will conclude this week now');
		if (userConfirms) {
			try {
				const res = await WeekServices(logOut).concludeWeek(user.token);
				if (res.status >= 200 && res.status < 300) {
					setTasks([]);
					setWeekDue(null);
					setDisplayBoard(false);
				}
			} catch (err) {
				console.error(err);
			}
		}
	}, []);

	const fetchActiveWeekDue = useCallback(async () => {
		try {
			const retrievedData = await WeekServices(logOut).getActiveWeekTasks(
				user.token
			);
			setWeekDue(
				retrievedData.weekDue === null ? null : new Date(retrievedData.weekDue)
			);
		} catch (err) {
			setApiErrorMessage("fetching current week's data failed");
		}
	}, [user]);

	useEffect(() => {
		fetchActiveWeekDue();
	}, []);

	useEffect(() => {
		if (!tasks.length) setWeekDue(null);
		else fetchActiveWeekDue();
	}, [tasks]);

	return (
		<div className="hud">
			<div className="completion">
				<h2>Completion:</h2>
				<CompletionCircle tasks={tasks} />
			</div>
			<div className="timeLeft">
				<h2>Time left:</h2>
				<h3
					className={
						weekDue
							? (new Date(weekDue) - new Date()) / (1000 * 60 * 60 * 24) < 1
								? 'flickerTimeLeft'
								: ''
							: ''
					}
				>
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
