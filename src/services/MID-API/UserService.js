import axios from "axios";
const apiUrl = `/api/settings/users`;
const headers = {authorization: `Bearer ${localStorage.getItem("token")}`}

export default {
  /**Get Records */
  fetchRecords(request = {}) {
    return axios.get(`${apiUrl}`, { params: request, headers: headers });
  },

  /**Get specific record via ID */
  fetchRecord(id) {
    return axios.get(`${apiUrl}/${id}`, { headers: headers });
  },

  /**Save record */
  async create(data) {
    return axios.post(`${apiUrl}`, data, { headers: headers });
  },

  async update(id, data) {
    return axios.put(`${apiUrl}/${id}`, data, { headers: headers });
  },

  async remove(id) {
    return axios.delete(`${apiUrl}/${id}`, { headers: headers });
  },
};
