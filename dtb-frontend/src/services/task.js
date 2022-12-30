import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/task';

/*https://stackoverflow.com/questions/51069552/axios-delete-request-with-request-body-and-headers*/
const addTask = async (token, weekId, newTask) => {
	try {
		const response = await axios.post(`${baseUrl}/addTask/${weekId}`, newTask, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const deleteTask = async (token, taskId) => {
	try {
		const response = await axios.delete(`${baseUrl}/deleteTask`, {
			data: taskId,

			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const editTask = async (token, editedTask) => {
	try {
		const response = await axios.put(`${baseUrl}/editTask`, editedTask, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const updateProgress = async (token, progressUpdatedTask) => {
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
		console.log(err);
	}
};
export default { addTask, deleteTask, editTask, updateProgress };
