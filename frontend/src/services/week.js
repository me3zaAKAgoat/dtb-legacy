import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/week';

const getactiveWeekId = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/activeWeekId`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getActiveWeekasks = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/activeWeekTasks`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const initiateNewWeek = async (token, newTask) => {
	try {
		const response = await axios.post(`${baseUrl}/initiateNewWeek`, newTask, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log('axios', err);
	}
};

const updateNotes = async (token, newNotes) => {
	try {
		const response = await axios.put(`${baseUrl}/updateNotes`, newNotes, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log('axios', err);
	}
};

const getactiveWeekNotes = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/activeWeekNotes`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (err) {
		console.log(err);
	}
};

const concludeWeek = async (token) => {
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
		console.log(err);
	}
};

export default {
	getactiveWeekId,
	initiateNewWeek,
	getActiveWeekasks,
	updateNotes,
	getactiveWeekNotes,
	concludeWeek,
};
