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
				res.weeks.forEach((week) => {
					newStats.labels.push(week.endDate.substring(0, 10));
					newStats.data.push(calcTotal(week.tasks));
				});
				setStats(newStats);
			});
	}, []);
	return (
		<div className="basePage">
			<div className="statisticsPage">
				<LineChart labels={stats.labels} yData={stats.data} />
			</div>
		</div>
	);
};

export default Statistics;
