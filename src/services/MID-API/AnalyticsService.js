import axios from "axios";
const apiUrl = `/api/analytics`;
const headers = {authorization: `Bearer ${localStorage.getItem("token")}`}

export default {
  getCount(request = {}) {
    return axios.get(`${apiUrl}/count`, { params: request, headers: headers });
  },

  getYears(request = {}) {
    return axios.get(`${apiUrl}/years`, { params: request, headers: headers });
  },

  getMonths(request = {}) {
    return axios.get(`${apiUrl}/months`, { params: request, headers: headers });
  },

  getYearlyData(request = {}) {
    return axios.get(`${apiUrl}/yearly-data`, { params: request, headers: headers });
  },

  getMonthlyData(request = {}) {
    return axios.get(`${apiUrl}/monthly-data`, { params: request, headers: headers });
  },

  
};
