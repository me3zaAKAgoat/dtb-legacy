import { useState, useEffect, useRef, useCallback } from 'react';
import WeekServices from '../../services/week.js';

const debounce = (callback, wait) => {
	let timeoutId = null;

	return (...args) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			callback(...args);
		}, wait);
	};
};
const updateNotes = debounce(async (token, notes) => {
	await WeekServices.updateNotes(token, {
		text: notes,
	});
}, 2000);

const NotesContainer = ({ user }) => {
	const [notes, setNotes] = useState('');
	const firstRender = useRef(true);
	const handleNotesChange = (e) => {
		setNotes(e.target.value);
	};

	const fetchCurrentWeekNotes = useCallback(async () => {
		try {
			const retrievedData = await WeekServices.getCurrentWeekNotes(user.token);
			setNotes(retrievedData.notes);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		fetchCurrentWeekNotes();
	}, []);

	useEffect(() => {
		if (firstRender.current) firstRender.current = !firstRender.current;
		else updateNotes(user.token, notes);
	}, [notes]);

	return (
		<div className="mainChildrenContainers">
			<div className="mainChildrenTitle">Notes</div>
			<textarea
				className="notesTextArea"
				value={notes}
				onChange={handleNotesChange}
			></textarea>
		</div>
	);
};

export default NotesContainer;
