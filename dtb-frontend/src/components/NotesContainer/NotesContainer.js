import { useState, useEffect } from 'react';
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

	const handleNotesChange = (e) => {
		setNotes(e.target.value);
	};

	const fetchCurrentWeekNotes = async () => {
		try {
			const retrievedData = await WeekServices.getCurrentWeekNotes(user.token);
			setNotes(retrievedData.notes);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchCurrentWeekNotes();
	}, []);

	useEffect(() => {
		updateNotes(user.token, notes);
	}, [notes]);

	return (
		<div className="notesContainer">
			<div className="noteTitle">Notes</div>
			<textarea
				className="notesTextArea"
				value={notes}
				onChange={handleNotesChange}
			></textarea>
		</div>
	);
};

export default NotesContainer;
