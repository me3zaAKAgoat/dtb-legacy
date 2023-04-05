import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/task';

const handleTokenError = (err, logOut) => {
	if (err?.response && err?.response?.status === 401) {
		logOut(); // call logOut function provided
	} else {
		throw err;
	}
};

const api = (logOut) => ({
	addTask: async (token, newTask) => {
		try {
			const response = await axios.post(`${baseUrl}/addTask`, newTask, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			handleTokenError(err, logOut); // pass logOut function to handleTokenError
		}
	},

	deleteTask: async (token, taskId) => {
		try {
			const response = await axios.delete(`${baseUrl}/deleteTask`, {
				data: taskId,

				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			handleTokenError(err, logOut); // pass logOut function to handleTokenError
		}
	},

	editTask: async (token, editedTask) => {
		try {
			const response = await axios.put(`${baseUrl}/editTask`, editedTask, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			handleTokenError(err, logOut); // pass logOut function to handleTokenError
		}
	},

	updateProgress: async (token, progressUpdatedTask) => {
		try {
			const response = await axios.put(
				`${baseUrl}/changeProgress`,
				progressUpdatedTask,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (err) {
			handleTokenError(err, logOut); // pass logOut function to handleTokenError
		}
	},
});

export default api;
