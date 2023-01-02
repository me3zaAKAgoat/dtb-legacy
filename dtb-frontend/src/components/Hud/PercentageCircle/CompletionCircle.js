import { useEffect, useState } from 'react';
import './CompletionCircle.scss';

const CompletionCircle = ({ sideSize, tasks }) => {
	const [completion, setCompletion] = useState(0);
	const priorityMap = new Map();
	priorityMap.set('low', 1);
	priorityMap.set('medium', 4);
	priorityMap.set('high', 7);

	useEffect(() => {
		let total = 0;
		let coeffTotal = 0;
		for (const task of tasks) {
			coeffTotal += priorityMap.get(task.priority);
		}
		for (const task of tasks) {
			total += (task.progress * priorityMap.get(task.priority)) / coeffTotal;
		}
		setCompletion(total);
	}, [tasks]);
	return (
		<div className="percentage" style={{ width: sideSize, height: sideSize }}>
			<div className="outer">
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<circle
						cx="50%"
						cy="50%"
						r={sideSize / 1.09}
						style={{
							strokeDasharray: ((2 * sideSize) / 1.09) * 3.14,
							strokeDashoffset:
								((2 * sideSize) / 1.09) * 3.14 * (1 - completion / 100),
						}}
					/>
				</svg>
				<div className="inner" style={{ fontSize: sideSize / 5 }}>
					{Math.trunc(completion)}%
				</div>
			</div>
		</div>
	);
};

export default CompletionCircle;
