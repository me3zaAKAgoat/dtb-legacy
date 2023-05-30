const priorityValue = {
	low: 1,
	medium: 4,
	high: 7,
};

const calcTotal = (tasks) => {
	if (tasks.length === 0) return 0;

	const coeffTotal = tasks.reduce(
		(accumulator, task) => accumulator + priorityValue[task.priority],
		0
	);
	return Math.trunc(
		tasks.reduce(
			(accumulator, task) =>
				accumulator + task.progress * priorityValue[task.priority],
			0
		) / coeffTotal
	);
};

export default calcTotal;
