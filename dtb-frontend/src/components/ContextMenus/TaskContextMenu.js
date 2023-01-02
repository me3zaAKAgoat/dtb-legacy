import { useCallback } from 'react';
import services from '../../services/task';
import './contextMenu.scss';

const TaskContextMenu = ({
	contextMenu,
	setContextMenu,
	setFormToOpen,
	user,
	tasks,
	setTasks,
}) => {
	const handleEditButton = useCallback((e) => {
		e.preventDefault();
		setFormToOpen('edit');
		setContextMenu({ show: false, x: null, y: null, id: null });
	}, []);

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

	const handleDropdownBlur = useCallback((e) => {
		e.preventDefault();
		if (!e.currentTarget.contains(e.relatedTarget)) {
			setContextMenu({ show: false, x: null, y: null, id: null });
		}
	}, []);

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
