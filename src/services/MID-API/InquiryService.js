import axios from "axios";
const apiUrl = `/api/inquiries`;
const headers = {authorization: `Bearer ${localStorage.getItem("token")}`}

export default {
  /** Search */
  search(data) {
    return axios.post(`${apiUrl}/search`, data, { headers: headers });
  },

  /**Get specific record via ID */
  fetchRecord(id) {
    return axios.get(`${apiUrl}/${id}`, { headers: headers });
  },

  /**Save record */
  async create(data) {
    return axios.post(`${apiUrl}`, data, { headers: headers });
  },

  /**Count Entries */
  async countEntries(data) {
    return axios.post(`${apiUrl}/count-entries`, data, { headers: headers });
  },


};
