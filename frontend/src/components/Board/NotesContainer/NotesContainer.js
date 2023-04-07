import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import WeekServices from 'services/week';
import { UserContext } from 'utils/useUser';
import { useDebounce } from 'utils/useDebounce';

const NotesContainer = ({ setApiErrorMessage }) => {
	const [notes, setNotes] = useState('');
	const { user, logOut } = useContext(UserContext);
	const debouncedNotes = useDebounce(notes, 2000);
	const isFirstRender = useRef(true);

	useEffect(() => {
		const saveNotes = async () => {
			try {
				await WeekServices(logOut).updateNotes(user.token, {
					text: debouncedNotes,
				});
			} catch (error) {
				console.error(error);
			}
		};

		if (isFirstRender.current) isFirstRender.current = false;
		else saveNotes();
	}, [debouncedNotes]);

	const handleNotesChange = useCallback((e) => {
		setNotes(e.target.value);
	});

	useEffect(() => {
		const fetchActiveWeekNotes = async () => {
			try {
				const response = await WeekServices(logOut).getActiveWeekNotes(
					user.token
				);
				if (response?.status === 204) {
					setNotes('');
				} else {
					setNotes(response?.notes);
				}
			} catch (err) {
				console.log(err);
				setApiErrorMessage("fetching current board's data failed");
			}
		};
		fetchActiveWeekNotes();
	}, [user]);

	return (
		<div className="mainChildrenContainers">
			<div className="mainChildrenTitle">Notes</div>
			<textarea
				className="notesTextArea"
				spellCheck="false"
				value={notes}
				onChange={handleNotesChange}
			></textarea>
		</div>
	);
};

export default NotesContainer;
