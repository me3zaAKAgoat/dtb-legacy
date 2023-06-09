import { useEffect, useContext, useState } from 'react';
import 'styles/App.scss';
import 'styles/Statistics.scss';
import WeekServices from 'services/week.js';
import LineChart from './Chart';
import { UserContext } from 'utils/useUser';
import calcTotal from 'utils/calcTotal.js';

const Statistics = () => {
	const { user, logOut } = useContext(UserContext);
	const [stats, setStats] = useState({ labels: [], data: [] });

	useEffect(() => {
		const newStats = { labels: [], data: [] };
		WeekServices(logOut)
			.getLastMonthWeeks(user.token)
			.then((res) => {
				if (res.weeks.length) {
					const orderedWeeks = res.weeks.sort(
						(a, b) => new Date(a.startDate) - new Date(b.startDate)
					);

					orderedWeeks.forEach((week) => {
						newStats.labels.push(week.startDate.substring(0, 10));
						newStats.data.push(calcTotal(week.tasks));
					});
					setStats(newStats);
				} else setStats(null);
			})
			.catch();
	}, []);

	if (!stats) {
		return (
			<div className="basePage">
				<h1>no content yet.</h1>
			</div>
		);
	} else if (!stats.labels.length || !stats.data.length) {
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
		return (
			<div className="basePage">
				<div className="statisticsPage">
					<LineChart labels={stats.labels} yData={stats.data} />
				</div>
			</div>
		);
	}
};

export default Statistics;
