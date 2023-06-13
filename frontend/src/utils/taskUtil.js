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

const strcmp = (s1, s2) => {
	for (let i = 0; i < s1.length && i < s2.length; i++) {
		if (s1.charCodeAt(i) !== s2.charCodeAt(i)) {
			return s1.charCodeAt(i) - s2.charCodeAt(i);
		}
	}

	return s1.length - s2.length;
};

export const sortedTasks = (tasks) => {
	return tasks.sort((a, b) => {
		const byPriority = priorityValue[b.priority] - priorityValue[a.priority];
		const byTitle = strcmp(a.title, b.title);
		return byPriority || byTitle;
	});
};
