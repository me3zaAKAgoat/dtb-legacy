import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const loginPost = async (loginInfo) => {
  const response = await axios.post(baseUrl, loginInfo);
  console.log(response.data);
  return response.data;
};

export default { loginPost };
