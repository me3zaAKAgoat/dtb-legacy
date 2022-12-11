import './HomeBody.scss';
import TasksContainer from '../TasksContainer/TasksContainer.js';
import NotesContainer from '../NotesContainer/NotesContainer.js';

const HomeBody = ({ user }) => {
	return (
		<div className="homeBody">
			<TasksContainer user={user} />
			<div className="separatingVerticalLine"></div>
			<NotesContainer user={user}/>
		</div>
	);
};

export default HomeBody;
