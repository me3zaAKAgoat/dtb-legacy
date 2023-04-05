import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/week';

const handleTokenError = (err, logOut) => {
	if (err?.response && err?.response?.status === 401) {
		logOut(); // call logOut function provided
	} else {
		throw err;
	}
};

const api = (logOut) => ({
	getActiveWeekId: async (token) => {
		try {
			const response = await axios.get(`${baseUrl}/activeWeekId`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			handleTokenError(err, logOut); // pass logOut function to handleTokenError
		}
	},

	getActiveWeekTasks: async (token) => {
		try {
			const response = await axios.get(`${baseUrl}/activeWeekTasks`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			handleTokenError(err, logOut); // pass logOut function to handleTokenError
		}
	},

	updateNotes: async (token, newNotes) => {
		try {
			const response = await axios.put(`${baseUrl}/updateNotes`, newNotes, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			handleTokenError(err, logOut); // pass logOut function to handleTokenError
		}
	},

	getActiveWeekNotes: async (token) => {
		try {
			const response = await axios.get(`${baseUrl}/activeWeekNotes`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			handleTokenError(err, logOut); // pass logOut function to handleTokenError
		}
	},

	concludeWeek: async (token) => {
		try {
			const response = await axios.post(
				`${baseUrl}/concludeWeek`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response;
		} catch (err) {
			handleTokenError(err, logOut); // pass logOut function to handleTokenError
		}
	},
});

export default api;
