import { useState } from 'react';
import './CompletionCircle.scss';

const CompletionCircle = ({ sideSize, completion }) => {
	return (
		<div className="percentage" style={{ width: sideSize, height: sideSize }}>
			<div className="outer">
				<div className="inner" style={{ fontSize: sideSize / 5 }}>
					{completion}%
				</div>
			</div>

			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<circle
					cx="50%"
					cy="50%"
					r={sideSize / 1.13}
					style={{
						strokeDasharray: ((2 * sideSize) / 1.13) * 3.14,
						strokeDashoffset:
							((2 * sideSize) / 1.13) * 3.14 * (1 - completion / 100),
					}}
				/>
			</svg>
		</div>
	);
};

export default CompletionCircle;
