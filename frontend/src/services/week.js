import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/week';

const getCurrentWeekId = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/currentWeekId`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getCurrentWeekTasks = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/currentWeekTasks`, {
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

const getCurrentWeekNotes = async (token) => {
	try {
		const response = await axios.get(`${baseUrl}/currentWeekNotes`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export default {
	getCurrentWeekId,
	initiateNewWeek,
	getCurrentWeekTasks,
	updateNotes,
	getCurrentWeekNotes,
};
