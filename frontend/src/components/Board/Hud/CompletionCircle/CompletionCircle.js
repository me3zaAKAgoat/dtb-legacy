import { useEffect, useRef, useState } from 'react';
import 'styles/CompletionCircle.scss';

const CompletionCircle = ({ tasks }) => {
	const [completion, setCompletion] = useState(0);
	const priorityValue = {
		low: 1,
		medium: 4,
		high: 7,
	};

	useEffect(() => {
		if (tasks.length === 0) {
			setCompletion(0);
			return;
		}

		const coeffTotal = tasks.reduce(
			(accumulator, task) => accumulator + priorityValue[task.priority],
			0
		);
		const total =
			tasks.reduce(
				(accumulator, task) =>
					accumulator + task.progress * priorityValue[task.priority],
				0
			) / coeffTotal;
		setCompletion(total);
	}, [tasks]);

	return (
		<div className="percentage">
			<div className="outer">
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<circle
						cx="50%"
						cy="50%"
						r="42.5%"
						style={{
							strokeDasharray: 2 * 42.5 * 3.14,
							strokeDashoffset: 2 * 42.5 * 3.14 * (1 - completion / 100),
						}}
					/>
				</svg>
				<div className="inner">{Math.trunc(completion)}%</div>
			</div>
		</div>
	);
};

export default CompletionCircle;