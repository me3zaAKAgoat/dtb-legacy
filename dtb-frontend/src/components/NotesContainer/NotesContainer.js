import { useState } from 'react';

const NotesContainer = () => {
  const [notes, setNotes] = useState([]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  return (
    <div className="notesContainer">
      <div className="noteTitle">Notes</div>
      <div className="notesSection">
        <textarea
          value={notes}
          maxLength={700}
          onChange={handleNotesChange}
        ></textarea>
      </div>
    </div>
  );
};

export default NotesContainer;
