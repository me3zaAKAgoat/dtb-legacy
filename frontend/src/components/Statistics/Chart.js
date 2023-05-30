import { useState } from 'react';
import Chart, { defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

defaults.font.family = 'SF PRO TEXT';
defaults.color = '#bbbbbb';
const themeColor = 'rgba(242, 85, 0, 0.8)';

const LineChart = ({ labels, yData }) => {
	const createGradient = () => {
		const ctx = document.createElement('canvas').getContext('2d');
		const gradient = ctx.createLinearGradient(0, 0, 0, 600);
		gradient.addColorStop(0, themeColor);
		gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
		return gradient;
	};

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Week Completion',
				data: yData,
				borderColor: themeColor,
				borderWidth: 5,
				tension: 0.3,
				fill: true,
				fillColor: themeColor,
				backgroundColor: createGradient(),
			},
		],
	};

	if (!labels.length || !yData.length) {
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
	} else {
		console.log(labels, yData);
		return (
			<Line
				data={data}
				options={{
					scales: {
						x: {
							title: {
								display: true,
								text: 'Date (YYYY-MM-DD)',
								align: 'center',
							},
							grid: {
								display: true,
								color: 'rgba(255, 255, 255, 0.1)',
								drawTicks: true,
								lineWidth: 1,
							},
						},
						y: {
							grid: {
								display: true,
								color: 'rgba(255, 255, 255, 0.1)',
								drawTicks: true,
								lineWidth: 1,
							},
							min: 0,
							max: 100, // Set the maximum value of the y-axis to 100
						},
					},
				}}
			/>
		);
	}
};

export default LineChart;
