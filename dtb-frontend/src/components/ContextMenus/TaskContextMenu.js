import { useCallback } from 'react';
import './contextMenu.scss';

const TaskContextMenu = ({ contextMenu, setContextMenu, id }) => {
	const handleEditButton = useCallback((e) => {
		e.preventDefault();
		setContextMenu({ show: false, x: null, y: null });
	}, []);

	const handleDeleteButton = useCallback((e) => {
		e.preventDefault();
		setContextMenu({ show: false, x: null, y: null });
	}, []);

	const handleDropdownBlur = useCallback((e) => {
		e.preventDefault();
		if (!e.currentTarget.contains(e.relatedTarget)) {
			setContextMenu({ show: false, x: null, y: null });
		}
	}, []);

	if (!contextMenu.show) return <></>;
	else {
		return (
			<div
				className="contextMenu"
				onBlur={(e) => handleDropdownBlur(e)}
				tabIndex="-1"
				style={{ top: contextMenu.y, left: contextMenu.x }}
			>
				<button onClick={handleEditButton}>Edit Task</button>
				<hr></hr>
				<button onClick={handleDeleteButton}>Delete Task</button>
			</div>
		);
	}
};

export default TaskContextMenu;
