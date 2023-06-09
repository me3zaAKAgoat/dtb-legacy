import 'styles/Board.scss';
import 'styles/App.scss';
import TaskList from 'components/Board/TaskList/TaskList.js';
import NotesContainer from 'components/Board/NotesContainer/NotesContainer.js';
import Hud from 'components/Board/Hud/Hud.js';
import WeekServices from 'services/week.js';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from 'utils/useUser';
import { useNavigate } from 'react-router-dom';
import TaskForm from 'components/Board/TaskForm/TaskForm';
import DebounceLoading from 'components/miscellaneous/DebounceLoad/DebounceLoad';
import { isDebouncingContext, useIsDebouncing } from 'utils/useDebounce';

/*
this component conditionally renders and edit task or a create task
form.
*/
const ModalPortal = ({
	tasks,
	setTasks,
	formState,
	setFormState,
	setDisplayBoard,
}) => {
	const [transitionProperties, setTransitionProperties] = useState({});

	/* 
	a small timeout between the creation of the form and then the adding the style of the form
	for the transition to take effect.
	if this dosent exist then the values visibility and opacity dont change thus no transition
	effect occurs.
	*/
	useEffect(() => {
		if (!formState?.type) {
			setTransitionProperties({});
		} else {
			setTimeout(() => {
				setTransitionProperties({ visibility: 'visible', opacity: 1 });
			}, 1);
		}
	}, [formState]);

	const handleBlur = (event) => {
		event.preventDefault();
		setFormState(null);
	};

	// tabIndex makes it so the div has focus and blur events and the -1 makes it not accessible by keyboard
	if (formState?.type === 'add' || formState?.type === 'edit') {
		return (
			<div
				className="baseModal"
				style={transitionProperties}
				onClick={handleBlur}
			>
				<div className="formContainer" onClick={(e) => e.stopPropagation()}>
					<TaskForm
						tasks={tasks}
						setTasks={setTasks}
						formState={formState}
						setFormState={setFormState}
						setDisplayBoard={setDisplayBoard}
					/>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

const ErrorBar = ({ errorMessage }) => {
	// fix the FUCKIGN TRANSITION OF THIS COMPONENT
	return (
		<div
			className={errorMessage === null ? 'errorBarPortal' : 'badServerResponse'}
		>
			{errorMessage === undefined
				? 'failed to connect to server'
				: errorMessage}
		</div>
	);
};

const Board = ({ setSettingsOpen }) => {
	const { user, logOut } = useContext(UserContext);
	const [tasks, setTasks] = useState([]);
	const [formState, setFormState] = useState({
		type: null,
		title: null,
		description: null,
		priority: null,
		id: null,
	});
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [displayBoard, setDisplayBoard] = useState(null);
	const { isDebouncing, setIsDebouncing } = useContext(isDebouncingContext);
	const navigate = useNavigate();

	const fetchActiveWeekTasks = useCallback(async () => {
		try {
			const retrievedData = await WeekServices(logOut).getActiveWeekTasks(
				user.token
			);
			setTasks(retrievedData.tasks);
		} catch (err) {
			setApiErrorMessage("fetching current board's data failed");
		}
	}, [user]);

	const fetchActiveWeekId = useCallback(async () => {
		try {
			const retrievedData = await WeekServices(logOut).getActiveWeekId(
				user.token
			);
			return retrievedData.id;
		} catch (err) {
			setApiErrorMessage('checking existence of a running board failed');
			return null;
		}
	}, [user]);

	useEffect(() => {
		fetchActiveWeekId().then((result) => {
			if (result !== null) {
				setDisplayBoard(true);
				fetchActiveWeekTasks();
			} else {
				setDisplayBoard(false);
			}
		});
	}, []);

	if (displayBoard === true)
		return (
			<div className="basePage">
				<div className="hudContainer">
					<DebounceLoading
						isDebouncing={isDebouncing}
					></DebounceLoading>
					<Hud
						tasks={tasks}
						setTasks={setTasks}
						setApiErrorMessage={setApiErrorMessage}
						setDisplayBoard={setDisplayBoard}
					/>
				</div>
				<main className="boardMain">
					<TaskList
						tasks={tasks}
						setTasks={setTasks}
						setFormState={setFormState}
					/>
					<div className="separatingVerticalLine"></div>
					<NotesContainer setApiErrorMessage={setApiErrorMessage} />
				</main>
				<ModalPortal
					tasks={tasks}
					setTasks={setTasks}
					formState={formState}
					setFormState={setFormState}
					setDisplayBoard={setDisplayBoard}
				/>
				<ErrorBar errorMessage={apiErrorMessage} />
			</div>
		);
	else if (displayBoard === false) {
		return (
			<div className="basePage">
				<div className="homepage">
					<div className="navigationItems">
						<div
							onClick={() => {
								setFormState({
									type: 'add',
									title: null,
									description: null,
									priority: null,
									id: null,
								});
							}}
						>
							<svg
								className="boardIcon"
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16.518 11.6318H23.868"
									stroke="white"
									strokeWidth="3.84847"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8.13202 11.6318L9.18202 12.6818L12.332 9.53184"
									stroke="white"
									strokeWidth="3.84847"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M16.518 21.4319H23.868"
									stroke="white"
									strokeWidth="3.84847"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8.13202 21.4319L9.18202 22.4819L12.332 19.3319"
									stroke="white"
									strokeWidth="3.84847"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M11.8 30H20.2C27.2 30 30 27.2 30 20.2V11.8C30 4.8 27.2 2 20.2 2H11.8C4.8 2 2 4.8 2 11.8V20.2C2 27.2 4.8 30 11.8 30Z"
									stroke="white"
									strokeWidth="3.84847"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<a>Start a new board</a>
						</div>
						<div onClick={() => navigate('/statistics')}>
							<svg
								className="statisticsIcon"
								width="28"
								height="28"
								viewBox="0 0 28 28"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19.8759 0H8.13805C3.03951 0 0 3.038 0 8.134V19.852C0 24.962 3.03951 28 8.13805 28H19.8619C24.9604 28 28 24.962 28 19.866V8.134C28.014 3.038 24.9744 0 19.8759 0ZM7.88593 22.61C7.88593 23.184 7.40969 23.66 6.83541 23.66C6.26112 23.66 5.78488 23.184 5.78488 22.61V19.712C5.78488 19.138 6.26112 18.662 6.83541 18.662C7.40969 18.662 7.88593 19.138 7.88593 19.712V22.61ZM15.0575 22.61C15.0575 23.184 14.5813 23.66 14.007 23.66C13.4327 23.66 12.9565 23.184 12.9565 22.61V16.8C12.9565 16.226 13.4327 15.75 14.007 15.75C14.5813 15.75 15.0575 16.226 15.0575 16.8V22.61ZM22.2291 22.61C22.2291 23.184 21.7528 23.66 21.1786 23.66C20.6043 23.66 20.128 23.184 20.128 22.61V13.902C20.128 13.328 20.6043 12.852 21.1786 12.852C21.7528 12.852 22.2291 13.328 22.2291 13.902V22.61ZM22.2291 9.478C22.2291 10.052 21.7528 10.528 21.1786 10.528C20.6043 10.528 20.128 10.052 20.128 9.478V8.12C16.5563 11.788 12.088 14.378 7.08753 15.624C7.00349 15.652 6.91945 15.652 6.83541 15.652C6.35917 15.652 5.93896 15.33 5.8129 14.854C5.67283 14.294 6.00899 13.72 6.58328 13.58C11.3036 12.404 15.5057 9.926 18.8394 6.426H17.0885C16.5142 6.426 16.038 5.95 16.038 5.376C16.038 4.802 16.5142 4.326 17.0885 4.326H21.1926C21.2486 4.326 21.2906 4.354 21.3466 4.354C21.4167 4.368 21.4867 4.368 21.5567 4.396C21.6268 4.424 21.6828 4.466 21.7528 4.508C21.7949 4.536 21.8369 4.55 21.8789 4.578C21.8929 4.592 21.8929 4.606 21.9069 4.606C21.9629 4.662 22.005 4.718 22.047 4.774C22.089 4.83 22.131 4.872 22.145 4.928C22.173 4.984 22.173 5.04 22.1871 5.11C22.2011 5.18 22.2291 5.25 22.2291 5.334C22.2291 5.348 22.2431 5.362 22.2431 5.376V9.478H22.2291Z"
									fill="white"
								/>
							</svg>
							<a>Head to statistics</a>
						</div>
						<div>
							<svg
								className="settingsIcon"
								width="28"
								height="28"
								viewBox="0 0 28 28"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M25.3273 9.87664C22.7946 9.87664 21.7591 7.97811 23.0185 5.64945C23.7461 4.29972 23.3123 2.57918 22.039 1.8079L19.6182 0.339512C18.5127 -0.357603 17.0855 0.0576995 16.4278 1.22945L16.2739 1.51126C15.0145 3.83992 12.9435 3.83992 11.6702 1.51126L11.5162 1.22945C10.8866 0.0576995 9.45927 -0.357603 8.35382 0.339512L5.93303 1.8079C4.65967 2.57918 4.22589 4.31455 4.95352 5.66428C6.22689 7.97811 5.1914 9.87664 2.65867 9.87664C1.2034 9.87664 0 11.1374 0 12.6948V15.3052C0 16.8478 1.18941 18.1234 2.65867 18.1234C5.1914 18.1234 6.22689 20.0219 4.95352 22.3505C4.22589 23.7003 4.65967 25.4208 5.93303 26.1921L8.35382 27.6605C9.45927 28.3576 10.8866 27.9423 11.5442 26.7706L11.6982 26.4887C12.9575 24.1601 15.0285 24.1601 16.3018 26.4887L16.4558 26.7706C17.1134 27.9423 18.5407 28.3576 19.6462 27.6605L22.067 26.1921C23.3403 25.4208 23.7741 23.6854 23.0465 22.3505C21.7731 20.0219 22.8086 18.1234 25.3413 18.1234C26.7966 18.1234 28 16.8626 28 15.3052V12.6948C27.986 11.1522 26.7966 9.87664 25.3273 9.87664ZM13.993 18.8205C11.4883 18.8205 9.44528 16.655 9.44528 14C9.44528 11.345 11.4883 9.17952 13.993 9.17952C16.4978 9.17952 18.5407 11.345 18.5407 14C18.5407 16.655 16.4978 18.8205 13.993 18.8205Z"
									fill="white"
								/>
							</svg>
							<a
								onClick={() => {
									setSettingsOpen(true);
								}}
							>
								Head to settings
							</a>
						</div>
					</div>
				</div>
				<ModalPortal
					tasks={tasks}
					setTasks={setTasks}
					formState={formState}
					setFormState={setFormState}
					setDisplayBoard={setDisplayBoard}
				/>
				<ErrorBar errorMessage={apiErrorMessage} />
			</div>
		);
	} else {
		return (
			<div className="basePage">
				<div className="loadingAnimation">
					<svg
						version="1.1"
						id="L9"
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						viewBox="0 0 100 100"
						enableBackground="new 0 0 0 0"
					>
						<path
							fill="#fff"
							d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
						>
							<animateTransform
								attributeName="transform"
								attributeType="XML"
								type="rotate"
								dur="0.7s"
								from="0 50 50"
								to="360 50 50"
								repeatCount="indefinite"
							/>
						</path>
					</svg>
				</div>
			</div>
		);
	}
};

export default Board;
