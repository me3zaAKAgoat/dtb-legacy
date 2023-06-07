import axios from 'axios';

const baseUrl = '/api/login';

const loginPost = async (loginInfo) => {
	const response = await axios.post(baseUrl, loginInfo);
	return response.data;
};

export default { loginPost };
