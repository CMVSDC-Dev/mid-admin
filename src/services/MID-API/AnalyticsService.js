// import axios from '@/plugins/axios';

const apiUrl = `/analytics`;
// const headers = {authorization: `Bearer ${localStorage.getItem("token")}`}

export default {
  fetchRecords(request = {}) {
    return axios.get(`${apiUrl}`, { params: request });
  },

  getYears(request = {}) {
    return axios.get(`${apiUrl}/years`, { params: request });
  },

  getMonths(request = {}) {
    return axios.get(`${apiUrl}/months`, { params: request });
  },

  getYearlyData(request = {}) {
    return axios.get(`${apiUrl}/yearly-data`, { params: request });
  },

  getMonthlyData(request = {}) {
    return axios.get(`${apiUrl}/monthly-data`, { params: request });
  },

  /**Count Entries */
  countEntries(request = {}) {
    return axios.get(`${apiUrl}/count-entries`, { params: request });
  },
};
