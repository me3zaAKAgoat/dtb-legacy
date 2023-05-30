import { useEffect, useRef, useState } from 'react';
import 'styles/CompletionCircle.scss';
import calcTotal from 'utils/calcTotal.js';

const CompletionCircle = ({ tasks }) => {
	const [completion, setCompletion] = useState(0);

	useEffect(() => {
		setCompletion(calcTotal(tasks));
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
				<div className="inner">{completion}%</div>
			</div>
		</div>
	);
};

export default CompletionCircle;
