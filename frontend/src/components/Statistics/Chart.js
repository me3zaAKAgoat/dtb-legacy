import Chart, { defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

defaults.font.family = 'SF PRO TEXT';
defaults.color = '#bbbbbb';
const themeColor = 'rgba(255, 255, 255, 0.8)';

const LineChart = ({ labels, yData }) => {
	const createGradient = () => {
		const ctx = document.createElement('canvas').getContext('2d');
		const gradient = ctx.createLinearGradient(0, 0, 0, 700);
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
};

export default LineChart;
