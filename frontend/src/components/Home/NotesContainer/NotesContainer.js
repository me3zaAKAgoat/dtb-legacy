import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import WeekServices from '../../../services/week.js';
import { UserContext } from '../../../App.js';

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

const NotesContainer = () => {
	const [user, setUser] = useContext(UserContext);
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

/*

Add PropTypes for the component's props to validate the data types of the received props.

Use useMemo hook for the debounce function to avoid creating a new function on each render.

Use error boundaries to catch errors thrown by the fetchCurrentWeekNotes function and handle them gracefully.

Use useState with the initial value of an empty string to store the notes, instead of calling setNotes with a string literal.

Use the useEffect hook with an empty dependency array to fetch the current week notes only once, instead of on every render.

Use the useEffect hook to handle the cleanup logic for the debounce function's timeout.

Remove the use of the useRef hook for the firstRender, as it is not necessary.

*/
