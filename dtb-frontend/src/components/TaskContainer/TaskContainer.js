import { useState } from 'react';
import editPng from './editButton.png';

const taskContainerOpenStyleTransition = {
  backgroundColor: '2d2d2d',
  height: '200px',
};

const TaskContainer = ({ task, setTaskToEdit, setFormToOpen }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [progress, setProgress] = useState(task.progress);
  const [open, setOpen] = useState(false);

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };
  return (
    <div
      className="taskContainer"
      style={open ? taskContainerOpenStyleTransition : {}}
    >
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        {title}
      </button>
      <div
        className="expandedContainer"
        style={
          open
            ? {
                visibility: 1,
                opacity: 1,
              }
            : {
                visibility: 0,
                opacity: 0,
              }
        }
      >
        <p>{description}</p>
        <div className="sliderEditButtonContainer">
          <button
            className="editTaskButton"
            type="button"
            onClick={() => {
              setTaskToEdit(task);
              setFormToOpen('edit');
            }}
          >
            <img src={editPng} />
          </button>
          <input
            type="range"
            className="progressionSlider"
            min={0}
            max={100}
            value={progress}
            onChange={handleProgressChange}
          />
          <input
            min={0}
            max={100}
            type="number"
            value={progress}
            onChange={handleProgressChange}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default TaskContainer;
