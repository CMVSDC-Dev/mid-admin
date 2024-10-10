// import axios from '@/plugins/axios';
const apiUrl = `/inquiries`;

export default {
  /** Search */
  search(data) {
    return axios.post(`${apiUrl}/search`, data);
  },

  /**Get specific record via ID */
  fetchRecord(id) {
    return axios.get(`${apiUrl}/${id}`);
  },

  /**Save record */
  async create(data) {
    return axios.post(`${apiUrl}`, data);
  },

};
