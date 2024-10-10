// import axios from '@/plugins/axios';
const apiUrl = `/settings/monitoring-configs`;

export default {
  /**Get Records */
  fetchRecords(request = {}) {
    return axios.get(`${apiUrl}`, { params: request });
  },

  /**Get specific record via ID */
  fetchRecord(id) {
    return axios.get(`${apiUrl}/${id}`);
  },

  /**Save record */
  async create(data) {
    return axios.post(`${apiUrl}`, data);
  },

  async update(id, data) {
    return axios.put(`${apiUrl}/${id}`, data);
  },

  async remove(id) {
    return axios.delete(`${apiUrl}/${id}`);
  },

};
