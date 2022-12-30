import { useCallback } from 'react';
import './contextMenu.scss';

const TaskContextMenu = ({ contextMenu, setContextMenu, setFormToOpen }) => {
	const handleEditButton = useCallback((e) => {
		e.preventDefault();
		setFormToOpen('edit');
		setContextMenu({ show: false, x: null, y: null, id: null });
	}, []);

	const handleDeleteButton = useCallback((e) => {
		e.preventDefault();
		setContextMenu({ show: false, x: null, y: null, id: null });
	}, []);

	const handleDropdownBlur = useCallback((e) => {
		e.preventDefault();
		console.log('onblur fires');
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
