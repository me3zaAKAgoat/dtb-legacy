import './Home.scss';
import TasksContainer from '../TasksContainer/TasksContainer.js';
import NotesContainer from '../NotesContainer/NotesContainer.js';

const home = ({ user }) => {
	return (
		<div className="home">
			<TasksContainer user={user} />
			<div className="separatingVerticalLine"></div>
			<NotesContainer user={user} />
		</div>
	);
};

export default home;
