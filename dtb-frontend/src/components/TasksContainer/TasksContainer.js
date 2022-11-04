import { useEffect, useRef, useState } from 'react';
import TaskContainer from '../TaskContainer/TaskContainer.js';
import plusSign from './plusCircle.png';
import WeekServices from '../../services/week.js';
import TaskServices from '../../services/task.js';

const EditTaskForm = ({
  user,
  taskToEdit,
  setTaskToEdit,
  tasks,
  setTasks,
  setFormToOpen,
}) => {
  const initialRender = useRef(true);
  const [nameField, setNameField] = useState(taskToEdit.title);
  const [descriptionField, setDescriptionField] = useState(
    taskToEdit.description
  );
  const [priorityField, setPriorityField] = useState('');
  const [editFormSubmitted, setEditFormSubmitted] = useState(false);

  const handleNameField = (e) => {
    setNameField(e.target.value);
  };

  const handleDescriptionField = (e) => {
    setDescriptionField(e.target.value);
  };

  const handleRadioChange = (e) => {
    setPriorityField(e.target.value);
  };

  const editTask = async () => {
    const fitsRequirements = [nameField, descriptionField, priorityField].every(
      (field) => {
        return field.length > 0;
      }
    );

    if (!fitsRequirements) {
      alert('Must fill all fields');
    } else {
      const editedTask = {
        title: nameField,
        description: descriptionField,
        priority: priorityField,
        id: taskToEdit.id,
      };
      try {
        const returnedTask = await TaskServices.editTask(
          user.token,
          editedTask
        );
        const newTasks = tasks.map((task) => {
          if (task.id === taskToEdit.id) {
            task.title = returnedTask.title;
            task.description = returnedTask.description;
            task.priority = returnedTask.priority;
            return task;
          } else {
            return task;
          }
        });
        setTasks(newTasks);
        setTaskToEdit(null);
        setFormToOpen(null);
        setNameField('');
        setDescriptionField('');
        setPriorityField('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      editTask();
    }
  }, [editFormSubmitted]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setEditFormSubmitted(!editFormSubmitted);
      }}
    >
      <h1>Edit the task</h1>
      <div className="taskNameContainer">
        <label htmlFor="taskNameInput">Name</label>
        <input
          type="text"
          id="taskNameInput"
          value={nameField}
          placeholder="Type your task's title"
          onChange={handleNameField}
          autoComplete="off"
        />
      </div>
      <div className="taskDescriptionContainer">
        <label htmlFor="taskDescriptionInput">Description</label>
        <textarea
          type="textarea"
          id="taskDescriptionInput"
          value={descriptionField}
          placeholder="Type your task's description"
          onChange={handleDescriptionField}
        />
      </div>
      <div className="priority">
        <p>Set the priority</p>
        <label htmlFor="high">high</label>
        <input
          type="radio"
          name="priority"
          value="high"
          onChange={handleRadioChange}
        />
        <label htmlFor="medium">medium</label>
        <input
          type="radio"
          name="priority"
          value="medium"
          onChange={handleRadioChange}
        />
        <label htmlFor="low">low</label>
        <input
          type="radio"
          name="priority"
          value="low"
          onChange={handleRadioChange}
        />
      </div>
      <div className="buttonsContainer">
        <button className="submitButton" type="submit">
          Submit
        </button>
        <button
          className="cancelButton"
          type="button"
          onClick={() => {
            setTaskToEdit(null);
            setFormToOpen(null);
            setNameField('');
            setDescriptionField('');
            setPriorityField('');
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
const NewTaskForm = ({ tasks, setTasks, user, setFormToOpen }) => {
  const initialRender = useRef(true);
  const [nameField, setUsernameField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');
  const [priorityField, setPriorityField] = useState('');
  const [newTaskFormSubmitted, setNewTaskFormSubmitted] = useState(false);

  const handleUsernameField = (e) => {
    setUsernameField(e.target.value);
  };

  const handleDescriptionField = (e) => {
    setDescriptionField(e.target.value);
  };

  const handleRadioChange = (e) => {
    setPriorityField(e.target.value);
  };

  const fetchCurrentWeekId = async () => {
    try {
      const currentWeekId = await WeekServices.getCurrentWeekId(user.token);
      return currentWeekId === {} ? null : currentWeekId.currentWeek;
    } catch (err) {
      console.log('current week fetch failed', err);
    }
  };

  const addNewTask = async () => {
    const fitsRequirements = [nameField, descriptionField, priorityField].every(
      (field) => {
        return field.length > 0;
      }
    );
    if (!fitsRequirements) {
      alert('Must fill all fields');
    } else {
      try {
        const newTask = {
          title: nameField,
          description: descriptionField,
          priority: priorityField,
          progress: 0,
        };
        const currentWeekId = await fetchCurrentWeekId();
        if (!currentWeekId) {
          const returnedTask = await WeekServices.initiateNewWeek(
            user.token,
            newTask
          );
          setTasks(tasks.concat(returnedTask));
        } else {
          const returnedTask = await TaskServices.addTask(
            user.token,
            currentWeekId,
            newTask
          );
          setTasks(tasks.concat(returnedTask));
        }
        setFormToOpen(null);
        setUsernameField('');
        setDescriptionField('');
        setPriorityField('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      addNewTask();
    }
  }, [newTaskFormSubmitted]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setNewTaskFormSubmitted(!newTaskFormSubmitted);
      }}
    >
      <h1>Add a new task</h1>
      <div className="taskNameContainer">
        <label htmlFor="taskNameInput">Name</label>
        <input
          type="text"
          id="taskNameInput"
          value={nameField}
          placeholder="Type your task's title"
          onChange={handleUsernameField}
          autoComplete="off"
        />
      </div>
      <div className="taskDescriptionContainer">
        <label htmlFor="taskDescriptionInput">Description</label>
        <textarea
          type="textarea"
          id="taskDescriptionInput"
          value={descriptionField}
          placeholder="Type your task's description"
          onChange={handleDescriptionField}
        />
      </div>
      <div className="priority">
        <p>Set the priority</p>
        <label htmlFor="high">high</label>
        <input
          type="radio"
          name="priority"
          value="high"
          onChange={handleRadioChange}
        />
        <label htmlFor="medium">medium</label>
        <input
          type="radio"
          name="priority"
          value="medium"
          onChange={handleRadioChange}
        />
        <label htmlFor="low">low</label>
        <input
          type="radio"
          name="priority"
          value="low"
          onChange={handleRadioChange}
        />
      </div>
      <div className="buttonsContainer">
        <button className="submitButton" type="submit">
          Submit
        </button>
        <button
          className="cancelButton"
          type="button"
          onClick={() => {
            setFormToOpen(null);
            setUsernameField('');
            setDescriptionField('');
            setPriorityField('');
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const FormRenderingComponent = ({
  formToOpen,
  setFormToOpen,
  user,
  taskToEdit,
  setTaskToEdit,
  tasks,
  setTasks,
}) => {
  const [transitionProperties, setTransitionProperties] = useState({});

  useEffect(() => {
    if (!formToOpen) {
      setTransitionProperties({});
    } else {
      setTimeout(() => {
        setTransitionProperties({ visibility: 'visible', opacity: 1 });
      }, 1);
    }
  }, [formToOpen]);
  if (formToOpen === 'add') {
    return (
      <div className="createTaskModal" style={transitionProperties}>
        <div className="tasksInitiationInputsContainer">
          <NewTaskForm
            tasks={tasks}
            setTasks={setTasks}
            user={user}
            setFormToOpen={setFormToOpen}
          />
        </div>
      </div>
    );
  } else if (formToOpen === 'edit') {
    return (
      <div className="createTaskModal" style={transitionProperties}>
        <div className="tasksInitiationInputsContainer">
          <EditTaskForm
            user={user}
            taskToEdit={taskToEdit}
            setTaskToEdit={setTaskToEdit}
            tasks={tasks}
            setTasks={setTasks}
            setFormToOpen={setFormToOpen}
          />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

const TasksContainer = ({ user }) => {
  const [weekDue, setWeekDue] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [formToOpen, setFormToOpen] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchCurrentWeekData = async () => {
    try {
      const retrievedData = await WeekServices.getCurrentWeekData(user.token);
      setTasks(retrievedData.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCurrentWeekEndDate = async () => {
    try {
      const retrievedData = await WeekServices.getCurrentWeekData(user.token);
      if (retrievedData.weekDue) {
        setWeekDue(new Date(retrievedData.weekDue));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCurrentWeekEndDate();
  }, [tasks]);
  useEffect(() => {
    fetchCurrentWeekData();
  }, []);

  return (
    <div className="tasksContainer">
      <div className="weekIndicator">
        Time Left:
        {weekDue !== null
          ? ` ${Math.floor(
              (new Date(weekDue) - new Date()) / (1000 * 60 * 60 * 24)
            )} Days ${Math.floor(
              ((new Date(weekDue) - new Date()) % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            )} Hours`
          : ' - Days - Hours'}
      </div>
      <div className="tasksSection">
        {tasks.map((task) => (
          <TaskContainer
            key={task.title + task.id}
            task={task}
            setTaskToEdit={setTaskToEdit}
            setFormToOpen={setFormToOpen}
          />
        ))}
        <button
          className="addTaskButton"
          onClick={() => {
            setFormToOpen('add');
          }}
        >
          <img src={plusSign}></img>
        </button>
      </div>
      <FormRenderingComponent
        user={user}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
        tasks={tasks}
        setTasks={setTasks}
        formToOpen={formToOpen}
        setFormToOpen={setFormToOpen}
      />
    </div>
  );
};

export default TasksContainer;
