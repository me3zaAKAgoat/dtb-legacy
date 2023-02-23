import { useEffect, useRef, useCallback, useContext } from 'react';
import WeekServices from 'services/week';
import { UserContext, useUser } from 'utils/useUser';
import { useDebounce } from 'utils/useDebounce';

const NotesContainer = ({ notes, setNotes, setApiErrorMessage }) => {
	const { user, logOut } = useContext(UserContext);
	const debouncedNotes = useDebounce(notes, 2000);
	const firstRender = useRef(true);

	useEffect(() => {
		const saveNotes = async () => {
			try {
				await WeekServices(logOut).updateNotes(user.token, {
					text: notes,
				});
			} catch (error) {
				console.error(error);
			}
		};

		if (firstRender.current) firstRender.current = false;
		else saveNotes();
	}, [debouncedNotes]);

	const handleNotesChange = useCallback((e) => {
		setNotes(e.target.value);
	});

	useEffect(() => {
		const fetchActiveWeekNotes = async () => {
			try {
				const response = await WeekServices(logOut).getActiveWeekNotes(user.token);
				if (response?.status === 204) setNotes('');
				else {
					setNotes(response?.data?.notes);
				}
			} catch (err) {
				console.log(err);
				setApiErrorMessage("fetching current week's data failed");
			}
		};
		fetchActiveWeekNotes();
	}, [user]);

	return (
		<div className="mainChildrenContainers">
			<div className="mainChildrenTitle">Notes</div>
			<textarea
				spellCheck="false"
				className="notesTextArea"
				value={notes}
				onChange={handleNotesChange}
			></textarea>
		</div>
	);
};

export default NotesContainer;
