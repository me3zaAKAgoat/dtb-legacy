import axios from 'axios';

const baseUrl = '/api/users';

const handleTokenError = (err, logOut) => {
	if (err?.response && err?.response?.status === 401) {
		logOut(); // call logOut function provided
	} else {
		throw err;
	}
};

const api = (logOut) => ({
	updateAvatar: async (token, formData) => {
		try {
			const response = await axios.post(`${baseUrl}/updateAvatar`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response;
		} catch (err) {
			console.log(err);
			handleTokenError(err, logOut);
		}
	},
	updateUsername: async (token, username) => {
		try {
			const response = await axios.post(`${baseUrl}/updateUsername`, username, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			console.log(err);
			handleTokenError(err, logOut);
		}
	},
	updatePassword: async (token, passwordBody) => {
		try {
			const response = await axios.post(
				`${baseUrl}/updatePassword`,
				passwordBody,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response;
		} catch (err) {
			console.log(err);
			handleTokenError(err, logOut);
		}
	},
});

export default api;
