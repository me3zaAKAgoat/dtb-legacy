import './Home.scss';
import TasksContainer from '../TasksContainer/TasksContainer.js';
import NotesContainer from '../NotesContainer/NotesContainer.js';
import WeekServices from '../../services/week.js';
import Hud from '../Hud/Hud';
import { useCallback, useEffect, useState } from 'react';
const Home = ({ user }) => {
	const [tasks, setTasks] = useState([]);

	const fetchCurrentWeekTasks = useCallback(async () => {
		try {
			const retrievedData = await WeekServices.getCurrentWeekTasks(user.token);
			setTasks(retrievedData.tasks);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		fetchCurrentWeekTasks();
	}, []);

	console.log(tasks, 'home');
	return (
		<div className="home">
			<div className="hudContainer">
				<Hud className="hud" user={user} tasks={tasks} />
			</div>
			<main className="main">
				<TasksContainer user={user} tasks={tasks} setTasks={setTasks} />
				<div className="separatingVerticalLine"></div>
				<NotesContainer user={user} />
			</main>
		</div>
	);
};

export default Home;
