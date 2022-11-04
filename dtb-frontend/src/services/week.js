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

const getCurrentWeekData = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/currentWeekData`, {
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

export default { getCurrentWeekId, initiateNewWeek, getCurrentWeekData };
