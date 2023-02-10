import '../../styles/ContextMenu.scss';
import { useCallback, useContext } from 'react';
import services from '../../services/task';
import { UserContext } from '../../App';

const TaskContextMenu = ({
	contextMenu,
	setContextMenu,
	tasks,
	setTasks,
	setFormState,
}) => {
	const [user, setUser] = useContext(UserContext);
	const handleEditButton = useCallback(
		(e) => {
			e.preventDefault();
			const task = tasks.find((object) => object.id === contextMenu.id);
			setFormState({
				type: 'edit',
				title: task.title,
				description: task.description,
				priority: task.priority,
				id: task.id,
			});
			setContextMenu({ show: false, x: null, y: null, id: null });
		},
		[contextMenu]
	);

	const handleDeleteButton = useCallback(
		async (e) => {
			e.preventDefault();
			const confirmDelete = window.confirm(`This task will now be deleted.`);
			if (confirmDelete) {
				await services.deleteTask(user.token, {
					taskId: contextMenu.id,
				});
				setTasks(tasks.filter((task) => task.id !== contextMenu.id));
				setContextMenu({ show: false, x: null, y: null, id: null });
			} else setContextMenu({ show: false, x: null, y: null, id: null });
		},
		[contextMenu]
	);

	const handleDropdownBlur = useCallback(
		(e) => {
			e.preventDefault();
			if (!e.currentTarget.contains(e.relatedTarget)) {
				setContextMenu({ show: false, x: null, y: null, id: null });
			}
		},
		[contextMenu]
	);

	if (contextMenu.show === false) return <></>;
	else {
		return (
			<button
				className="contextMenu"
				onBlur={(e) => handleDropdownBlur(e)}
				style={{
					top: contextMenu.y + 'px',
					left: contextMenu.x + 'px',
				}}
				tabIndex="-1"
				autoFocus
			>
				<button onClick={handleEditButton}>Edit Task</button>
				<hr></hr>
				<button onClick={handleDeleteButton}>Delete Task</button>
			</button>
		);
	}
};

export default TaskContextMenu;
