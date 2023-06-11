const priorityValue = {
	low: 1,
	medium: 4,
	high: 7,
};

export const calcTotal = (tasks) => {
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

export const sortedTasks = (tasks) => {
	return tasks.sort(
		(a, b) => priorityValue[b.priority] - priorityValue[a.priority]
	);
};
