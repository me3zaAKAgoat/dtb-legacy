import { useState } from 'react';

const NotesContainer = () => {
	const [notes, setNotes] = useState(['Write Your notes Here.']);

	const handleNotesChange = (e) => {
		setNotes(e.target.value);
	};
	return (
		<div className="notesContainer">
			<div className="noteTitle">Notes</div>
			<div
				className="notesTextArea"
				value={notes}
				maxLength={700}
				onChange={handleNotesChange}
				contentEditable="true"
			>
				{notes}
			</div>
		</div>
	);
};

export default NotesContainer;
